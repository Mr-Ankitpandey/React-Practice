import type { SelectFieldOptions, userType } from "../Types/userType";

export type AppliedFilter = {
    field: SelectFieldOptions;
    value: string;
} | null;

export type HandleFilterParametersType = {
    selectedField: SelectFieldOptions;
    selectedValue: string;
};

export const StateHandlers = (
    setUserData: React.Dispatch<React.SetStateAction<userType[]>>,
    setAppliedFilter: React.Dispatch<React.SetStateAction<AppliedFilter>>,
) => {
    const handleAdd = (user: userType) => {
        setUserData((prev) => [
            ...prev,
            {
                id: user?.id,
                name: user?.name?.trim(),
                city: user?.city?.trim(),
                age: Number(user?.age),
            },
        ]);
    };

    const handleUpdate = (user: userType) => {
        setUserData((prev) => prev?.map((u) => (u?.id === user?.id ? user : u)));
    };

    const handleDelete = (id: number) => {
        setUserData((prev) => prev?.filter((u) => u?.id !== id));
    };

    const handleFilter = ({ selectedField, selectedValue }: HandleFilterParametersType) => {
        setAppliedFilter({ field: selectedField, value: selectedValue });
    };

    const handleAll = () => {
        setAppliedFilter(null);
    };

    return { handleAdd, handleUpdate, handleDelete, handleFilter, handleAll };
};
