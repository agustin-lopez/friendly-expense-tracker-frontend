import { useState } from "react";
import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Tooltip from "../components/Tooltip.jsx";
import {X} from "lucide-react";

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
            loginUser(token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="blue-window">
                <div className={"w-100% flex flex-row justify-between content-center p-1 mb-1"}>
                    <h2 className="text-white flex flex-row">Login</h2>
                    <Tooltip text={"This one is for decoration only! x.x"}>
                        <div className="bg-red-400 p-0.5 rounded-[3px] border-solid border-1 border-white">
                            <X size={20} color={"white"}/>
                        </div>
                    </Tooltip>
                </div>
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

                    <p className="text-sm text-center mt-4">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-blue-600 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}