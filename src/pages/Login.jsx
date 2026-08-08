import { useState } from "react";
import {login, resendVerification} from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import BlueWindow from "../components/BlueWindow.jsx";
import Title from "../assets/title-alt.png";
import DefaultButton from "../components/DefaultButton.jsx";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [needsVerification, setNeedsVerification] = useState(false);
    const [resendStatus, setResendStatus] = useState("");
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setNeedsVerification(false);
        setResendStatus("");

        try {
            const token = await login(email, password);
            await loginUser(token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
            if (err.message.toLowerCase().includes("verif")) {
                setNeedsVerification(true);
            }
        }
    }

    async function handleResend() {
        setResendStatus("");
        try {
            await resendVerification(email);
            setResendStatus("We sent you a new verification email. Please check your inbox!");
        } catch (err) {
            setResendStatus("We couldn't send you a new verification email. Please try again later! x.x");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <BlueWindow title="Login" className="w-[30rem]">
                <div
                    className="flex flex-col place-content-center w-full h-50 custom-bg-3 border-b-4 border-[#0c3eb6] gap-3">
                    <img src={Title} alt="Friendly Expense Tracker title" draggable="false"
                         className="w-70 vertical-align middle place-self-center select-none"/>
                    {/*<p className="text-white ml-4">by Agustín E. López</p>*/}
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 pt-10 rounded-b-[3px] w-100 flex flex-col gap-5"
                >
                    <div className="flex flex-row items-center gap-3 place-content-between">
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
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
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-[260px] border rounded-[2px] px-3 py-1 text-[15px]"
                            required
                        />
                    </div>

                    <DefaultButton submit={true} fontSize="14" className="place-self-center">
                        Log in
                    </DefaultButton>
                </form>

                <div className="mb-3 w-full  flex flex-col gap-2">
                    {error && (
                        <p className="w-full text-white msg-bg-red px-3 py-1 text-sm text-center">{error}</p>
                    )}

                    {needsVerification && (
                        <div className="text-center">
                            {resendStatus ? (

                                        <p className="text-sm">{resendStatus}</p>
                                    
                            ) : (
                                    <button
                                        type="button"
                                        onClick={handleResend}
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        Resend verification email?
                                    </button>
                                )
                            }
                        </div>
                    )}
                </div>

                <div className="custom-bg-2 w-[100%] p-6 flex flex-col">
                    <p className="text-sm">
                        • Don't have an account?{" "}
                        <Link to="/register" className="text-blue-600 hover:underline">
                            Sign up
                        </Link>
                        {"!"}
                    </p>

                    <p className="text-sm">
                        • {" "}
                        <Link to="/forgot-password" className="text-blue-600 hover:underline">
                            Forgot your password?
                        </Link>
                    </p>
                </div>
            </BlueWindow>
        </div>
    );
}