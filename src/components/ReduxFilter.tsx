import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type { SelectFieldOptions } from "../Types/userType";
import { allUser, filterUser } from "../redux/userSlice";
import { useState, useMemo } from "react";
import Table from "./Table";
import { displayDataHelper } from "../helpers/displayDataHelper";
import { uniqueValuesHelper } from "../helpers/uniqueValuesHelper";

const selectFieldOptions: SelectFieldOptions[] = ["Name", "Age", "City"];

const ReduxFilter = () => {
  const [selectedField, setSelectedField] = useState<SelectFieldOptions | null>(
    null,
  );
  const [selectedValue, setSelectedValue] = useState<string>("");

  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user?.userData);
  const appliedFilter = useSelector(
    (state: RootState) => state.user?.appliedFilter,
  );

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target?.value;
    if (value === "select-field") {
      setSelectedField(null);
    } else {
      setSelectedField(value as SelectFieldOptions);
    }
    setSelectedValue("");
  };

  const handleUniqueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target?.value);
  };

  const uniqueValues = useMemo((): (string | number | undefined)[] => {
    return uniqueValuesHelper({ selectedField, userData });
  }, [selectedField, userData]);

  const displayData = useMemo(() => {
    return displayDataHelper({ appliedFilter, userData });
  }, [userData, appliedFilter]);

  const handleFilter = () => {
    if (!selectedField || !selectedValue) {
      alert("Please select both a field and value.");
      return;
    }
    dispatch(filterUser({ selectedField, selectedValue }));
  };

  const handleAll = () => {
    dispatch(allUser());
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

export default ReduxFilter;
