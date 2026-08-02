import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { verifyEmail } from "../services/authService";

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [status, setStatus] = useState("loading");
    const [error, setError] = useState("");

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
            }
        }
        doVerify();
    }, [token]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-80 text-center">
                {status === "loading" && <p className="text-gray-500">Verifying...</p>}
                {status === "success" && (
                    <>
                        <p className="text-green-600 mb-4">¡Your account was verified successfully!</p>
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Log in
                        </Link>
                    </>
                )}
                {status === "error" && <p className="text-red-500">{error}</p>}
            </div>
        </div>
    );
}