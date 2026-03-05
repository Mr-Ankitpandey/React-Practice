import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import type { SelectFieldOptions, userType } from "../Types/userType";

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export interface RootState {
    user: {
        userData: userType[];
        appliedFilter: {
            field: SelectFieldOptions;
            value: string;
        } | null;
    };
}