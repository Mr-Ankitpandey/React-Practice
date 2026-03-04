import { createSlice } from "@reduxjs/toolkit";
import type { SelectFieldOptions, userType } from "../Types/userType";

interface UserState {
    userData: userType[];
    appliedFilter: {
        field: SelectFieldOptions;
        value: string;
    } | null;
}

const initialState: UserState = {
    userData: [],
    appliedFilter: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.userData.push({
                id: Number(new Date()),
                name: String(action.payload.name).trim(),
                city: String(action.payload.city).trim(),
                age: Number(action.payload.age),
            });
        },
        updateUser: (state, action) => {
            state.userData = state.userData.map((user) =>
                user?.id === action.payload.id ? action.payload : user
            );
        },
        deleteUser: (state, action) => {
            state.userData = state.userData.filter(
                (user) => user?.id !== action.payload
            );
        },
        filterUser: (state, action) => {
            if (action.payload === null || action.payload?.selectedField === null) {
                state.appliedFilter = null;
                return;
            }
            state.appliedFilter = {
                field: action.payload.selectedField,
                value: action.payload.selectedValue,
            };
        },
    },
});

export const { addUser, updateUser, deleteUser, filterUser } =
    userSlice.actions;
export const userReducer = userSlice.reducer;
