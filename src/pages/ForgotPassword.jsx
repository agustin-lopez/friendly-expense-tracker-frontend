import { useState } from "react";
import { Link } from "react-router-dom";
import { requestPasswordReset } from "../services/authService";
import BlueWindow from "../components/BlueWindow.jsx";
import DefaultButton from "../components/DefaultButton.jsx";

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
        <div className="flex items-center justify-center min-h-screen">
            <BlueWindow title="Password recovery">
                {sent ? (
                    <div className="p-6">
                        <p className="text-sm text-center"> You'll receive a link to reset your password. Please check your email!</p>
                    </div>
                ) : (
                    <form
                        name="forgot-password"
                        onSubmit={handleSubmit}
                        className="bg-white p-6 pt-10 rounded-b-[3px] flex flex-col gap-5 text-sm"
                    >

                        <div className="flex flex-row items-center gap-6 place-content-between">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-[260px] max-sm:w-[200px] border rounded-[2px] px-3 py-1 text-[15px]"
                                required
                            />
                        </div>

                        <DefaultButton submit={true} className="place-self-center" fontSize="14">
                            Send recovery link
                        </DefaultButton>
                    </form>
                )}

                {error && <p className="text-sm mb-3 text-white p-1 msg-bg-red w-full text-center">{error}</p>}

                <div className="custom-bg-2 w-[100%] p-6 flex flex-col">
                    <p className="text-sm">
                        • {" "}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Back to login
                        </Link>
                    </p>
                </div>
            </BlueWindow>
        </div>
);
}