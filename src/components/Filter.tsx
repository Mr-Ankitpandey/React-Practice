import { useMemo, useState } from "react";
import type { SelectFieldOptions, userType } from "../Types/userType";
import Table from "./Table";
import { uniqueValuesHelper } from "../utils/uniqueValuesHelper";
import { displayDataHelper } from "../utils/displayDataHelper";

type FilterProp = {
  userData: userType[];
};

const selectFieldOptions: SelectFieldOptions[] = ["Name", "Age", "City"];

const Filter = ({ userData }: FilterProp) => {
  const [selectedField, setSelectedField] = useState<SelectFieldOptions | null>(
    null,
  );
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [appliedFilter, setAppliedFilter] = useState<{
    field: SelectFieldOptions;
    value: string;
  } | null>(null);

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target?.value;
    if (value === "select-field") {
      setSelectedField(null);
    } else {
      setSelectedField(value as SelectFieldOptions);
    }
    setSelectedValue("");
  };

   const uniqueValues = useMemo((): (string | number | undefined)[] => {
     return uniqueValuesHelper({selectedField, userData})
   }, [selectedField, userData]);

  const handleUniqueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target?.value);
  };

  const displayData = useMemo(() => {
     return displayDataHelper({appliedFilter, userData})
   }, [userData, appliedFilter]);

  const handleFilter = () => {
    if (!selectedField || !selectedValue) {
      alert("Please select both a field and a value before filtering.");
      return;
    }
    setAppliedFilter({
      field: selectedField,
      value: selectedValue,
    });
  };

  const handleAll = () => {
    setAppliedFilter(null);
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
        {selectFieldOptions?.map((field) => (
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

export default Filter;
