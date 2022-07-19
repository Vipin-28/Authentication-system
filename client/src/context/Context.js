//1 (first file) of the context api

import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";   // this the reducer function

// initial values of the useReducer hooke
const INITIAL_STATE = {   // before register  and login process
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);   // whenever the state user changes it will be running !!!
  // ex- if we logout then automatically user is deleted

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,       // take care of switch b/w actions
      }}
    >
      {children}
    </Context.Provider>
  );
};