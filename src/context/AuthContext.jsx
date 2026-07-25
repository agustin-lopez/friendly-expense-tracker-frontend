import { createContext, useContext, useState } from "react";
import { apiClient } from "../services/apiClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);

    async function loginUser(newToken) {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        const currentUser = await apiClient.get("/users/me");
        setUser(currentUser);
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
        loginUser,
        logoutUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}