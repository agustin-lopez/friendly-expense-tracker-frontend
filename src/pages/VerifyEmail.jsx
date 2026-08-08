import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {resendVerification, verifyEmail} from "../services/authService";
import BlueWindow from "../components/BlueWindow.jsx";

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [status, setStatus] = useState("loading");
    const [error, setError] = useState("");
    const [emailForResend, setEmailForResend] = useState(null);
    const [resendStatus, setResendStatus] = useState("");

    useEffect(() => {
        async function doVerify() {
            if (!token) {
                setStatus("error");
                setError("Invalid link");
                return;
            }
            try {
                await verifyEmail(token);
                setStatus("success");
            } catch (err) {
                setStatus("error");
                setError(err.message);
                setEmailForResend(err.email || null);
            }
        }
        doVerify();
    }, [token]);

    async function handleResend() {
        setResendStatus("");
        try {
            await resendVerification(emailForResend);
            setResendStatus("We sent you a new verification email. Please check your inbox!");
        } catch (err) {
            setResendStatus("We couldn't send you a new verification email. Please try again later! x.x");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <BlueWindow title="Sign up" className="w-[31rem]">
                <div className="p-6 flex flex-col gap-3 items-center">
                    {status === "loading" && <p>Verifying...</p>}
                    {status === "success" && <p>Your account has been verified successfully!</p>}
                    {status === "error" && (
                        <div className="flex flex-col items-center">
                            <p>{error}</p>
                            {emailForResend && (
                                <>
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
                                    )}
                                </>
                            )}
                        </div>
                    )}


                    <div className="white-button-wrap">
                        <Link to="/login" className="white-button">
                            Back to login
                        </Link>
                    </div>
                </div>
            </BlueWindow>
        </div>
    );
}