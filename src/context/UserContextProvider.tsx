import { useReducer } from "react";
import type {
  filters,
  reducerActionType,
  reducerStateType,
  UserContextType,
  userType,
} from "../Types/userType";
import { UserContext } from "./context";

const reducerFn = (state:reducerStateType, action:reducerActionType) => {
  switch (action?.type) {
    case "addUser":
      return {
        ...state,
        userData: [
          ...state.userData,
          {
            id: action.user?.id,
            name: action.user?.name.trim(),
            city: action.user?.city.trim(),
            age: Number(action.user?.age),
          },
        ],
      };
    case "updateUser":
      return {
        ...state,
        userData: state.userData?.map((u) =>
          u.id === action.updatedUser?.id ? action.updatedUser : u,
        ),
      };
    case "deleteUser":
      return {
        ...state,
        userData: state.userData?.filter(
          (user) => user?.id !== action?.selectedId,
        ),
      };
    case "filterUser":
      if (
        action?.chosenfilter === null ||
        action?.chosenfilter?.selectedField === null
      ) {
        return {
          ...state,
          appliedFilter: null,
        };
      }
      return {
        ...state,
        appliedFilter: {
          field: action?.chosenfilter?.selectedField,
          value: action?.chosenfilter?.selectedValue,
        },
      };

    case "allUser":
      return {
        ...state,
        appliedFilter: null,
      };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const initialState = {
    userData: [],
    appliedFilter: null,
  };

  const [state, dispatch] = useReducer(reducerFn, initialState);

  const addUser = (user: userType) => {
    dispatch({ type: "addUser", user });
  };

  const updateUser = (updatedUser: userType) => {
    dispatch({ type: "updateUser", updatedUser });
  };

  const deleteUser = (selectedId: number) => {
    dispatch({ type: "deleteUser", selectedId });
  };

  const filterUser = (chosenfilter: filters | null) => {
    dispatch({ type: "filterUser", chosenfilter });
  };

  const allUser = () => {
    dispatch({ type: "allUser" });
  };

  const ctxValue: UserContextType = {
    userData: state?.userData,
    addUser,
    updateUser,
    deleteUser,
    filterUser,
    allUser,
    appliedFilter: state?.appliedFilter,
  };

  return (
    <UserContext.Provider value={ctxValue}>{children}</UserContext.Provider>
  );
};
