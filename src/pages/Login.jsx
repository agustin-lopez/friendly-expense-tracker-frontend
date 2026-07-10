import { useState } from "react";
import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { loginUser } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            const token = await login(email, password);
            loginUser(token);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-80"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">Log in</h1>

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
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}