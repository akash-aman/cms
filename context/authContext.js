import React, { useState, useEffect, useContext, createContext } from "react";

//we have to use dynamic import of firebase in useEffect to lazy load firebase script  
import { onAuthStateChanged, auth } from "../firebase";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
//import firebase from "firebase/app";
//import "firebase/auth";
//import nookies from 'nookies'
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    // firebaseClient();

    const [user, setUser] = useState(null);
    // const auth = getAuth(firebase);

    useEffect(() => {


        return onAuthStateChanged(auth, async (user) => {

            if (!user) {
                setUser(null);

                //nookies.set(undefined, "_token", "", { domain: "127.0.0.1", hostOnly: false, sameSite: "None" });
                localStorage.setItem("_token", "");
                return;
            }

            const token = await user.getIdToken();
            setUser(user);

            //nookies.set(undefined, "_token", token, { domain: "127.0.0.1", hostOnly: false, sameSite: "None" });
            localStorage.setItem("_token", token);
        });

    }, []);

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);