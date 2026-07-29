import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <p className="p-8 text-gray-500">Loading... :O</p>;

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    return children;
}