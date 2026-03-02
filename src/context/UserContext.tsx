import { createContext, useState } from "react";
import type { userType } from "../Types/userType";

interface UserContextType {
    userData: userType[];
    addUser: (user: Omit<userType, "id">) => void;
    updateUser: (user: userType) => void;
    deleteUser: (id: number) => void;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [userData, setUserData] = useState<userType[]>([]);

    const addUser = (user: Omit<userType, "id">) => {
        setUserData((prev) => [
            ...prev,
            {
                id: Number(new Date()),
                name: user.name.trim(),
                city: user.city.trim(),
                age: Number(user.age),
            },
        ]);
    };

    const updateUser = (updated: userType) => {
        setUserData((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    };

    const deleteUser = (id: number) => {
        setUserData((prev) => prev.filter((u) => u.id !== id));
    };

    return (
        <UserContext.Provider value={{ userData, addUser, updateUser, deleteUser }}>
            {children}
        </UserContext.Provider>
    );
};
