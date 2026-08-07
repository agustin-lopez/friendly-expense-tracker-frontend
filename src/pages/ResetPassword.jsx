import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { resetPassword } from "../services/authService";
import BlueWindow from "../components/BlueWindow.jsx";
import DefaultButton from "../components/DefaultButton.jsx";

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (newPassword !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        try {
            await resetPassword(token, newPassword);
            setSuccess(true);
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError(err.message);
        }
    }

    if (!token) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-red-500">Invalid link</p>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <BlueWindow title="Password reset" className="w-[30rem]">

                    {success ? (
                        <p className="w-full px-3 py-1 text-white msg-bg-green text-sm text-center">
                            Password updated succesfully!
                        </p>
                    ) : (
                        <form onSubmit={handleSubmit}
                              className="bg-white p-8 pt-10 rounded-b-[3px] w-full flex flex-col gap-5 mx-auto">

                            <div className="flex flex-row items-center gap-3 place-content-between">
                                <label className="block text-sm font-medium">New password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    autoComplete="new-password"
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-[260px] border rounded-[2px] px-3 py-1 text-[15px]"
                                    required
                                />
                            </div>

                            <div className="flex flex-row items-center gap-3 place-content-between">
                                <label className="block text-sm font-medium">Re-type it</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    autoComplete="new-password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-[260px] border rounded-[2px] px-3 py-1 text-[15px]"
                                    required
                                />
                            </div>

                            <DefaultButton submit={true} className="place-self-center">
                                Confirm
                            </DefaultButton>
                        </form>
                    )}

                {error && <p className="text-sm mb-3 text-white p-1 msg-bg-red w-full text-center">{error}</p>}

                <div className="custom-bg-2 w-full p-6 flex flex-col">
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