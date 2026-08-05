import { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../services/authService";
import BlueWindow from "../components/BlueWindow.jsx";
import Title from "../assets/title-alt.png";
import DefaultButton from "../components/DefaultButton.jsx";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [registered, setRegistered] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        try {
            await register(name, email, password);
            setRegistered(true);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <BlueWindow title="Sign up" className="w-[30rem]">
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
                    <div className="w-full">
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white p-8 pt-10 rounded-b-[3px] w-full flex flex-col gap-5 mx-auto"
                        >

                            <div className="flex flex-row items-center gap-3 place-content-between">
                                <label className="block text-sm font-medium">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-[260px] border rounded-[2px] px-3 py-1 text-[15px]"
                                    required
                                />
                            </div>

                            <div className="flex flex-row items-center gap-3 place-content-between">
                                <label className="block text-sm font-medium">Email</label>
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
                                <label className="block text-sm font-medium">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    autoComplete="new-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-[260px] border rounded-[2px] px-3 py-1 text-[15px]"
                                    required
                                />
                            </div>

                            <div className="flex flex-row items-center gap-3 place-content-between">
                                <label className="block text-sm font-medium">Confirm password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    autoComplete="new-password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-[260px] border rounded-[2px] px-3 py-1 text-[15px]"
                                    required
                                />
                            </div>

                            {error && (
                                <p className="text-sm text-white p-1 msg-bg-red w-full text-center">{error}</p>
                            )}

                            <DefaultButton submit={true} className="place-self-center">
                                Continue
                            </DefaultButton>
                        </form>
                        <div className="custom-bg-2 w-full p-6 flex flex-col">
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