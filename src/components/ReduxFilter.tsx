import { useDispatch, useSelector } from "react-redux";
import type { SelectFieldOptions } from "../Types/userType";
import { useState } from "react";

const selectFieldOptions: SelectFieldOptions[] = ["Name", "Age", "City"];

const fieldMap = {
  Name: "name",
  Age: "age",
  City: "city",
} as const;

const ReduxFilter = () => {
  const [selectedField, setSelectedField] = useState<SelectFieldOptions | null>(
    null,
  );
  const [selectedValue, setSelectedValue] = useState<string>("");
  const dispatch = useDispatch();
  const filterUser = useSelector((state) => state.user.filterUser);

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "select-field") {
      setSelectedField(null);
    } else {
      setSelectedField(value as SelectFieldOptions);
    }
    setSelectedValue("");
  };

  
    const handleUniqueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedValue(e.target.value);
    };
  
   

  const handleFilter = () => {
    if (!selectedField || !selectedValue) {
      alert("Please select both a field and value.");
      return;
    }
    dispatch(filterUser({ selectedField, selectedValue }));
  };


  const handleAll = ()=> {
    dispatch(filterUser(null))
    setSelectedField(null)
    setSelectedValue("")
  }
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

export default ReduxFilter;
