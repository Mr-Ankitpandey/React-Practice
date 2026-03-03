import { useEffect, useRef, useState } from "react";
import type { SelectFieldOptions, userType } from "../Types/userType";
import Table from "./Table";
type FilterProp = {
  userData: userType[];
};
const selectFieldOptions: SelectFieldOptions[] = ["Name", "Age", "City"];
const Filter = ({ userData }: FilterProp) => {
  console.log("Filter component rendering....");

  const [selectedField, setSelectedField] = useState<string>("select-field");
  const [selectedValue, setSelectedValue] = useState<string | null>("select-value");
  const [filteredData, setFilteredData] = useState<userType[]>(userData);
  const isFilter = useRef<boolean>(false);

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (value === "select-field") {
      return;
    } else {
      setSelectedField(value);
    }
  };

  const getUniqueValues = (): (string | number)[] => {
    if (!selectedField) return [];
    const fieldMap = {
      Name: "name",
      Age: "age",
      City: "city",
    } as const;

    const key = fieldMap[selectedField];
    const values = userData.map((user) => user[key]);
    return [...new Set(values)];
  };
  console.log(selectedField);

  const handleUniqueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };
  useEffect(() => {
    setFilteredData(userData);
  }, [userData]);

  const handleFilter = () => {
    if (!selectedField || !selectedValue || selectedValue === "unique-value") {
      alert("Please apply filters");
      return;
    }
    console.log(selectedValue);
    isFilter.current = true;
    const fieldMap = {
      Name: "name",
      Age: "age",
      City: "city"
    } as const;

    const key = fieldMap[selectedField];

    const result = userData?.filter((user) => {
      // if (key === "age") {
      //   return user[key] === selectedValue;
      // }
      return user[key] === selectedValue;
    });

    setFilteredData(result);
  };
  const handleAll = () => {
    isFilter.current = false;
    setFilteredData(userData);
    setSelectedField(null);
    console.log("selectedfield", selectedField);
    
  };

  return (
    <>
      <h1>Filters</h1>
      <label htmlFor="">Select Field : </label>
      <select onChange={handleFieldChange}>
        <option value="select-field">Select Field</option>
        {selectFieldOptions?.map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>
      <br /> <br />
      <label>Unique Values : </label>
      <select onChange={handleUniqueChange}>
        <option value="unique-value">Select Value</option>
        {getUniqueValues()?.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <br /> <br />
      <button onClick={handleFilter}>Filter</button>
      <button onClick={handleAll}>All</button>
      <hr />
        <Table userData={isFilter ? filteredData : userData} />
    </>
  );
};

export default Filter;
