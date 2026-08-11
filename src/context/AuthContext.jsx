import { createContext, useContext, useState, useEffect } from "react";
import { apiClient } from "../services/apiClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function refreshUser() {
        const currentUser = await apiClient.get("/users/me");
        setUser(currentUser);
    }

    useEffect(() => {
        async function loadUser() {
            if (token) {
                try {
                    await refreshUser();
                } catch {
                    localStorage.removeItem("token");
                    setToken(null);
                    setUser(null);
                }
            }
            setLoading(false);
        }

        loadUser();
    }, []);

    async function loginUser(newToken) {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        await refreshUser();
    }

    function logoutUser() {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    }

    const value = {
        token,
        user,
        isAuthenticated: !!token,
        loading,
        loginUser,
        logoutUser,
        refreshUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}