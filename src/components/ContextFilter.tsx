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
    const isFilter = useRef<boolean>(false);
    // Tracks the last filter committed via the Filter button (not live dropdown state)
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

    // Re-applies the committed filter whenever userData changes (e.g. new user added).
    // Uses appliedFilter ref — NOT live dropdown state — so the table stays
    // unchanged until the Filter button is clicked.
    useEffect(() => {
        if (isFilter.current && appliedFilter.current) {
            const { field, value } = appliedFilter.current;
            const key = fieldMap[field];
            const filterVal = key === "age" ? Number(value) : value;
            setFilteredData(userData.filter((user) => user[key] === filterVal));
        } else if (!isFilter.current) {
            setFilteredData(userData);
        }
    }, [userData]);

    const handleFilter = () => {
        if (!selectedField || !selectedValue || selectedValue === "unique-value") {
            alert("Please select both a field and a value before filtering.");
            return;
        }
        // Commit the selection — useEffect will use this on subsequent userData changes
        appliedFilter.current = { field: selectedField, value: selectedValue };
        isFilter.current = true;
        const key = fieldMap[selectedField];
        const filterVal = key === "age" ? Number(selectedValue) : selectedValue;
        setFilteredData(userData.filter((user) => user[key] === filterVal));
    };

    const handleAll = () => {
        isFilter.current = false;
        appliedFilter.current = null;
        setFilteredData(userData);
        setSelectedField(null);
        setSelectedValue("");
    };

    return (
        <>
            <h1>Filters</h1>
            <label htmlFor="ctx-select-field">Select Field : </label>
            <select
                id="ctx-select-field"
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
            <label htmlFor="ctx-select-unique">Unique Values : </label>
            <select
                id="ctx-select-unique"
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
            <Table userData={isFilter.current ? filteredData : userData} />
        </>
    );
};

export default ContextFilter;
