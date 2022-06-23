import React, { useState, useContext, createContext } from "react";

export const PageContext = createContext({});

export const PageProvider = ({ totalPage, children }) => {


    const [pageCount, setPageCount] = useState(totalPage);

    return (
        <PageContext.Provider value={{ pageCount: pageCount }}>{children}</PageContext.Provider>
    );
};
export const usePage = () => useContext(PageContext);