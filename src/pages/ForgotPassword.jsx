import { useState } from "react";
import { Link } from "react-router-dom";
import { requestPasswordReset } from "../services/authService";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        try {
            await requestPasswordReset(email);
            setSent(true);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-80">
                <h1 className="text-2xl font-bold mb-6 text-center">Password recovery</h1>

                {sent ? (
                    <p className="text-green-600 text-sm text-center"> You'll receive a link to reset your password. </p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border rounded px-3 py-2 mb-6"
                            required
                        />

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                        >
                            Send recovery link
                        </button>
                    </form>
                )}

                <p className="text-sm text-center mt-4">
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Back to login
                    </Link>
                </p>
            </div>
        </div>
    );
}