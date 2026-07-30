import { useState } from "react";
import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import BlueWindow from "../components/BlueWindow.jsx";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            const token = await login(email, password);
            await loginUser(token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <BlueWindow title="Login">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-b-[3px] shadow-md w-80"
                >
                    {error && (
                        <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
                    )}

                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded px-3 py-2 mb-4"
                        required
                    />

                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded px-3 py-2 mb-6"
                        required
                    />

                    <button
                        type="submit"
                        className="blue-button place-self-center"
                    >
                        Submit
                    </button>
                </form>
                <div className="custom-bg-2 w-[100%] p-6 flex flex-col">
                    <p className="text-sm">
                        - Don't have an account?{" "}
                        <Link to="/register" className="text-blue-600 hover:underline">
                            Sign up
                        </Link>
                        {"!!"}
                    </p>

                    <p className="text-sm">
                        - {" "}
                        <Link to="/forgot-password" className="text-blue-600 hover:underline">
                            Forgot your password?
                        </Link>
                    </p>
                </div>
            </BlueWindow>
        </div>
    );
}