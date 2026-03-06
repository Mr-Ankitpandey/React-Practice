import type { SelectFieldOptions, userType } from "../Types/userType";

export type AppliedFilter = {
    field: SelectFieldOptions;
    value: string;
} | null;

export type FilterPayload = {
    selectedField: SelectFieldOptions;
    selectedValue: string;
};

/**
 * Returns handlers for user CRUD + filter operations driven by React state setters.
 * Used by StatePage to produce the props passed down to User and Filter components.
 */
export const createStateHandlers = (
    setUserData: React.Dispatch<React.SetStateAction<userType[]>>,
    setAppliedFilter: React.Dispatch<React.SetStateAction<AppliedFilter>>,
) => {
    const handleAdd = (user: userType) => {
        setUserData((prev) => [
            ...prev,
            {
                id: user.id,
                name: user.name.trim(),
                city: user.city.trim(),
                age: Number(user.age),
            },
        ]);
    };

    const handleUpdate = (user: userType) => {
        setUserData((prev) => prev.map((u) => (u.id === user.id ? user : u)));
    };

    const handleDelete = (id: number) => {
        setUserData((prev) => prev.filter((u) => u.id !== id));
    };

    const handleFilter = ({ selectedField, selectedValue }: FilterPayload) => {
        setAppliedFilter({ field: selectedField, value: selectedValue });
    };

    const handleAll = () => {
        setAppliedFilter(null);
    };

    return { handleAdd, handleUpdate, handleDelete, handleFilter, handleAll };
};
