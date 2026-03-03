import { useContext, useEffect, useMemo, useRef, useState } from "react";
import type { SelectFieldOptions, userType } from "../Types/userType";
import Table from "./Table";
import { UserContext } from "../context/UserContext";

const selectFieldOptions: SelectFieldOptions[] = ["Name", "Age", "City"];

const fieldMap = {
    Name: "name",
    Age: "age",
    City: "city",
} as const;

const ContextFilter = () => {
    const { userData } = useContext(UserContext)!;

    const [selectedField, setSelectedField] = useState<SelectFieldOptions | null>(null);
    const [selectedValue, setSelectedValue] = useState<string>("");
    const [filteredData, setFilteredData] = useState<userType[]>(userData);
    const [isFilter, setIsFilter] = useState<boolean>(false)
    // const isFilter = useRef<boolean>(false);
    const appliedFilter = useRef<{ field: SelectFieldOptions; value: string } | null>(null);

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
        if (isFilter && appliedFilter.current) {
            const { field, value } = appliedFilter.current;
            const key = fieldMap[field];
            const filterVal = key === "age" ? Number(value) : value;
            setFilteredData(userData.filter((user) => user[key] === filterVal));
        } else if (!isFilter) {
            setFilteredData(userData);
        }
    }, [userData]);

    const handleFilter = () => {
        if (!selectedField || !selectedValue || selectedValue === "unique-value") {
            alert("Please select both a field and a value before filtering.");
            return;
        }
        appliedFilter.current = { field: selectedField, value: selectedValue };
        // isFilter.current = true;
        setIsFilter(true)
        const key = fieldMap[selectedField];
        const filterVal = key === "age" ? Number(selectedValue) : selectedValue;
        setFilteredData(userData.filter((user) => user[key] === filterVal));
    };

    const handleAll = () => {
        // isFilter.current = false;
        setIsFilter(false)
        appliedFilter.current = null;
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

export default ContextFilter;
