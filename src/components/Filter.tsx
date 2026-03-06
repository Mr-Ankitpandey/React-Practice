import { useMemo, useState } from "react";
import type { SelectFieldOptions, userType } from "../Types/userType";
import Table from "./Table";
import { uniqueValuesHelper } from "../utils/uniqueValuesHelper";
import { displayDataHelper } from "../utils/displayDataHelper";
import Select from "./ui/Select";
import Button from "./ui/Button";

type FilterProps = {
  userData: userType[];
  appliedFilter: { field: SelectFieldOptions; value: string } | null;
  onFilter: (filter: {
    selectedField: SelectFieldOptions;
    selectedValue: string;
  }) => void;
  onAll: () => void;
};

const selectFieldOptions: SelectFieldOptions[] = ["Name", "Age", "City"];

const userTableColumns = [
  { key: "name", label: "Name" },
  { key: "city", label: "City" },
  { key: "age", label: "Age" },
];

const Filter = ({ userData, appliedFilter, onFilter, onAll }: FilterProps) => {
  const [selectedField, setSelectedField] = useState<SelectFieldOptions | null>(
    null,
  );
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target?.value;
    setSelectedField(value as SelectFieldOptions);
    setSelectedValue("");
  };

  const uniqueValues = useMemo((): (string | number | undefined)[] => {
    return uniqueValuesHelper({ selectedField, userData });
  }, [selectedField, userData]);

  const handleUniqueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target?.value);
  };

  const displayData = useMemo(() => {
    return displayDataHelper({ appliedFilter, userData });
  }, [userData, appliedFilter]);

  const filterBtnHandler = () => {
    if (!selectedField || !selectedValue) {
      alert("Please select both a field and a value before filtering.");
      return;
    }
    onFilter({ selectedField, selectedValue });
  };

  const allBtnHandler = () => {
    onAll();
    setSelectedField(null);
    setSelectedValue("");
  };

  const fieldOptions = selectFieldOptions?.map((f) => ({ value: f }));
  const valueOptions = uniqueValues?.map((v) => ({
    value: v as string | number,
  }));

  return (
    <>
      <h1>Filters</h1>
      <label htmlFor="select-field">Select Field : </label>
      <Select
        id="select-field"
        value={selectedField ?? ""}
        onChange={handleFieldChange}
        options={fieldOptions}
        placeholder="Select Field"
      />
      <br /> <br />
      <label htmlFor="select-unique">Unique Values : </label>
      <Select
        id="select-unique"
        value={selectedValue}
        onChange={handleUniqueChange}
        options={valueOptions}
        placeholder="Select Value"
      />
      <br /> <br />
      <Button type="button" onClick={filterBtnHandler}>
        Filter
      </Button>
      <Button type="button" onClick={allBtnHandler}>
        All
      </Button>
      <hr />
      <Table columns={userTableColumns} data={displayData} />
    </>
  );
};

export default Filter;
