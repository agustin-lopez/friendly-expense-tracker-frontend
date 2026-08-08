import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { confirmPasswordChange } from "../services/authService";
import BlueWindow from "../components/BlueWindow.jsx";

export default function ConfirmPasswordChange() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [status, setStatus] = useState("loading");
    const [error, setError] = useState("");

    useEffect(() => {
        async function doConfirm() {
            if (!token) {
                setStatus("error");
                setError("Invalid link");
                return;
            }
            try {
                await confirmPasswordChange(token);
                setStatus("success");
            } catch (err) {
                setStatus("error");
                setError(err.message);
            }
        }
        doConfirm();
    }, [token]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <BlueWindow title="Sign up" className="w-[31rem]">
                <div className="p-6 flex flex-col gap-3 items-center">
                    {status === "loading" && <p>Processing...</p>}
                    {status === "success" && (
                        <p>Your password has been updated successfully!</p>
                    )}
                    {status === "error" && (
                        <div className="flex flex-col items-center">
                            {status === "error" && <p className="text-red-500">{error}</p>}
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