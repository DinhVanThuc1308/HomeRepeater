import axios from "axios";
import React, { useState, createContext, useEffect } from "react";
import { ACCESS_TOKEN } from '../shared/constants';
import LoadingPage from './pageloading';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [login, setLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem(ACCESS_TOKEN) || '');
    const [loading, setLoading] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const api = "http://localhost:1337/api/users/me";

    const setKey = (token) => {
        localStorage.setItem(ACCESS_TOKEN, token);
        setToken(token);
    }

    useEffect(() => {
        setLoading(true);
        async function fetchUser() {
            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    params: {
                        populate: 'role,avatar'
                    }
                };
                const res = await axios.get(api, config);
                setUser(res.data);
                setLogin(true);
            } catch (err) {
                console.error("11111111", err);
                logout();
            } finally {
                setLoading(false);
                setIsLoaded(true);
            }
        }
        if (token !== "" && token !== undefined) {
            fetchUser();
        } else {
            console.error("222");
            setLoading(false);
            setIsLoaded(true);
        }
    }, [token]);

    const logout = () => {
        setKey("");
        setUser(null);
        setLogin(false);
    }

    const auth = {
        checkLogin: login,
        auth: user,
        setKey: setKey,
        logout: logout
    }

    return (
        <AuthContext.Provider value={auth}>
            {isLoaded ? (
                children
            ) : (
                <LoadingPage />
            )}
        </AuthContext.Provider>
    );
};
