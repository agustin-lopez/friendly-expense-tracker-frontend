import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile, changePassword } from "../services/userService";

export default function ProfileSettings() {
    const { user } = useAuth();
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [profileMessage, setProfileMessage] = useState("");
    const [profileError, setProfileError] = useState("");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordError, setPasswordError] = useState("");

    async function handleProfileSubmit(e) {
        e.preventDefault();
        setProfileError("");
        setProfileMessage("");
        try {
            await updateProfile(name, email);
            setProfileMessage("Update successful");
        } catch (err) {
            setProfileError(err.message);
        }
    }

    async function handlePasswordSubmit(e) {
        e.preventDefault();
        setPasswordError("");
        setPasswordMessage("");

        if (newPassword !== confirmPassword) {
            setPasswordError("Password doesn't match!");
            return;
        }

        try {
            await changePassword(user.id, newPassword);
            setPasswordMessage("Password update successful");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            setPasswordError(err.message);
        }
    }

    return (
        <div className="space-y-6 place-self-center">
            <form onSubmit={handleProfileSubmit}
                  className="bg-white flex flex-col gap-5"
            >
                <h3 className="text-sl font-semibold text-gray-700">User data</h3>

                <div className="flex flex-row items-center gap-3 place-content-between">
                    <label className="text-sm font-medium">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-[260px] border rounded-[2px] px-3 py-1 text-[15px]"
                        required
                    />
                </div>

                <div className="flex flex-row items-center gap-3 place-content-between">
                    <label className="text-sm font-medium">Email</label>
                    <p>{email}</p>
                </div>

                <div className="white-button-wrap place-self-center">
                    <button
                        type="submit"
                        className="white-button"
                    >
                        Save
                    </button>
                </div>

                {profileError && <p className="text-red-500 text-sm mb-2">{profileError}</p>}
                {profileMessage && <p className="text-green-600 text-sm mb-2">{profileMessage}</p>}

            </form>

            <hr/>

            <form onSubmit={handlePasswordSubmit}
                  className="bg-white flex flex-col gap-5"
            >
                <h3 className="text-sl font-semibold text-gray-700 mb-3">Change password</h3>
                {passwordError && <p className="text-red-500 text-sm mb-2">{passwordError}</p>}
                {passwordMessage && <p className="text-green-600 text-sm mb-2">{passwordMessage}</p>}

                <div className="flex flex-row items-center gap-3 place-content-between">
                    <label className="block text-sm font-medium mb-1">Choose a new password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-[260px] border rounded-[2px] px-3 py-1 text-[15px]"
                        required
                    />
                </div>

                <div className="flex flex-row items-center gap-3 place-content-between">
                    <label className="block text-sm font-medium mb-1">Re-type your new password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-[260px] border rounded-[2px] px-3 py-1 text-[15px]"
                        required
                    />
                </div>

                <div className="white-button-wrap place-self-center">
                    <button
                        type="submit"
                        className="white-button"
                    >
                        Save
                    </button>
                </div>

            </form>
        </div>
    );
}