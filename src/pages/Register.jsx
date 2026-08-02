import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import BlueWindow from "../components/BlueWindow.jsx";
import Title from "../assets/title-alt.png";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [registered, setRegistered] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            await register(name, email, password);
            setRegistered(true);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <BlueWindow title="Sign up" className="max-w-[30rem]">
                <div
                    className="flex flex-col place-content-center w-full h-50 custom-bg-3 border-b-4 border-[#0c3eb6] gap-3">
                    <img src={Title} alt="Friendly Expense Tracker title" draggable="false"
                         className="w-70 vertical-align middle place-self-center select-none"/>
                </div>

                {registered ? (
                    <div className="flex flex-col items-center p-4">
                        <p className="text-sm m-5">
                            Account created! Please check your email to verify it before logging in.
                        </p>
                        <div className="white-button-wrap">
                            <Link to="/login" className="white-button">
                                Back to login
                            </Link>
                        </div>

                    </div>
                ) : (
                    <div>
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white p-6 pt-10 rounded-b-[3px] w-100 flex flex-col gap-5"
                        >
                            {error && (
                                <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
                            )}

                            <div className="flex flex-row items-center gap-3 place-content-between">
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-[260px] border rounded-[2px] px-3 py-1 text-[15px]"
                                    required
                                />
                            </div>

                            <div className="flex flex-row items-center gap-3 place-content-between">
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-[260px] border rounded-[2px] px-3 py-1 text-[15px]"
                                    required
                                />
                            </div>

                            <div className="flex flex-row items-center gap-3 place-content-between">
                                <label className="block text-sm font-medium mb-1">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    autoComplete="new-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-[260px] border rounded-[2px] px-3 py-1 text-[15px]"
                                    required
                                />
                            </div>

                            <div className="white-button-wrap place-self-center">
                                <button
                                    type="submit"
                                    className="white-button"
                                >
                                    Continue
                                </button>
                            </div>
                        </form>
                        <div className="custom-bg-2 w-[100%] p-6 flex flex-col">
                            <p className="text-sm">
                                • Already have an account?{" "}
                                <Link to="/login" className="text-blue-600 hover:underline">
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </div>
                )}

            </BlueWindow>
        </div>
    );
}