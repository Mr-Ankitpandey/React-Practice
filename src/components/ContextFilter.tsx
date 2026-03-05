import { useContext, useMemo, useState } from "react";
import type { SelectFieldOptions } from "../Types/userType";
import Table from "./Table";
import { UserContext } from "../context/UserContext";

const selectFieldOptions: SelectFieldOptions[] = ["Name", "Age", "City"];

const fieldMap = {
  Name: "name",
  Age: "age",
  City: "city",
} as const;

const ContextFilter = () => {
  const { userData, appliedFilter, filterUser } = useContext(UserContext)!;

  const [selectedField, setSelectedField] = useState<SelectFieldOptions | null>(
    null,
  );
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "select-field") {
      setSelectedField(null);
    } else {
      setSelectedField(value as SelectFieldOptions);
    }
    setSelectedValue("");
  };

  const uniqueValues = useMemo((): (string | number | undefined)[] => {
    if (!selectedField) return [];
    const key = fieldMap[selectedField];
    const values = userData.map((user) => user[key]);
    const loweCaseValues = values.map((value)=>{
      if(typeof value === 'number') return value
      if(typeof value === 'string'){
        return value.toLowerCase();
      }
    })
    
    return [...new Set(loweCaseValues)];
  }, [selectedField, userData]);

  const handleUniqueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };

  const displayData = useMemo(() => {
    if (!appliedFilter) return userData;

    const key = fieldMap[appliedFilter.field];
    const filterVal =
        key === "age" ? Number(appliedFilter.value) : appliedFilter.value

    return  userData.filter((user) => user[key] === filterVal);
    
}, [userData, appliedFilter]);

  const handleFilter = () => {
    if (!selectedField || !selectedValue) {
      alert("Please select both a field and value.");
      return;
    }
    filterUser({selectedField, selectedValue})
  };

  const handleAll = () => {
    filterUser(null)
    setSelectedField(null);
    setSelectedValue("");
  };

  return (
    <>
      <h1>Filters</h1>
      <label htmlFor="select-field">Select Field : </label>
      <select
        id="select-field"
        value={selectedField ?? "select-field"}
        onChange={handleFieldChange}
      >
        <option value="select-field">Select Field</option>
        {selectFieldOptions.map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>
      <br /> <br />
      <label htmlFor="select-unique">Unique Values : </label>
      <select
        id="select-unique"
        value={selectedValue}
        onChange={handleUniqueChange}
      >
        <option value="">Select Value</option>
        {uniqueValues?.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <br /> <br />
      <button onClick={handleFilter}>Filter</button>
      <button onClick={handleAll}>All</button>
      <hr />
      <Table userData={displayData} />
    </>
  );
};

export default ContextFilter;
