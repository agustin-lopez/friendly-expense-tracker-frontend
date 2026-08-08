import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BlueWindow from "../components/BlueWindow.jsx";

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <BlueWindow title="Friendly Expense Tracker" className="w-[20rem]">
                <h2 className="m-5">Loading...</h2>
            </BlueWindow>
        </div>
    );

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    return children;
}