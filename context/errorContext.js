import React, { useState, createContext } from "react";

// error, true or false , seterror, showerror from navbar
export const ErrorContext = createContext();

export const ErrorContextProvider = (props) => {

    const [error, setError] = useState("");
    const [show, setShow] = useState(false);

    const value = { error, show, setError, setShow }
    return (
        <ErrorContext.Provider value={value}>
            {props.children}
        </ErrorContext.Provider>
    )
}

export default ErrorContextProvider;