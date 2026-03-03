/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import type { SelectFieldOptions, userType } from "../Types/userType";
import Table from "./Table";

type FilterProp = {
  userData: userType[];
};

const selectFieldOptions: SelectFieldOptions[] = ["Name", "Age", "City"];

const fieldMap = {
  Name: "name",
  Age: "age",
  City: "city",
} as const;

const Filter = ({ userData }: FilterProp) => {
  const [selectedField, setSelectedField] = useState<SelectFieldOptions | null>(null);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [filteredData, setFilteredData] = useState<userType[]>(userData);
  const [isFilter, setIsFilter] = useState<boolean>(false)

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "select-field") {
      setSelectedField(null);
    } else {
      setSelectedField(value as SelectFieldOptions);
    }
    setSelectedValue("");
  };

  const uniqueValues = useMemo((): (string | number)[] => {
    if (!selectedField) return [];
    const key = fieldMap[selectedField];
    const values = userData.map((user) => user[key]);
    return [...new Set(values)];
  }, [selectedField, userData]);

  const handleUniqueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };

  useEffect(() => {
    if (isFilter && selectedField && selectedValue) {
      const key = fieldMap[selectedField];
      const filterVal = key === "age" ? Number(selectedValue) : selectedValue;
      setFilteredData(userData.filter((user) => user[key] === filterVal));
    } else if (!isFilter) {
      setFilteredData(userData);
    }
  }, [userData]);

  const handleFilter = () => {
    if (!selectedField || !selectedValue) {
      alert("Please select both a field and a value before filtering.");
      return;
    }
    setIsFilter(true)
    const key = fieldMap[selectedField];
    const filterVal = key === "age" ? Number(selectedValue) : selectedValue;
    const result = userData.filter((user) => user[key] === filterVal);
    setFilteredData(result);
  };

  const handleAll = () => {
    setIsFilter(false)
    setFilteredData(userData);
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
        {uniqueValues.map((value) => (
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
