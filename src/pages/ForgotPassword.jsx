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
                    <p className="text-green-600 text-sm text-center"> You'll receive a link to reset your
                        password. </p>
                ) : (
                    <form onSubmit={handleSubmit}
                          className="bg-white p-6 pt-10 rounded-b-[3px] w-100 flex flex-col gap-5"
                    >
                        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

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

                        <DefaultButton submit={true} className="place-self-center" fontSize="14">
                            Send recovery link
                        </DefaultButton>
                    </form>
                )}

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