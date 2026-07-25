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
        <div className="space-y-6">
            <form onSubmit={handleProfileSubmit}>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">User data</h3>
                {profileError && <p className="text-red-500 text-sm mb-2">{profileError}</p>}
                {profileMessage && <p className="text-green-600 text-sm mb-2">{profileMessage}</p>}

                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border rounded px-3 py-2 mb-3"
                    required
                />

                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded px-3 py-2 mb-3"
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                >
                    Save
                </button>
            </form>

            <hr />

            <form onSubmit={handlePasswordSubmit}>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Change password</h3>
                {passwordError && <p className="text-red-500 text-sm mb-2">{passwordError}</p>}
                {passwordMessage && <p className="text-green-600 text-sm mb-2">{passwordMessage}</p>}

                <label className="block text-sm font-medium mb-1">New password</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full border rounded px-3 py-2 mb-3"
                    required
                />

                <label className="block text-sm font-medium mb-1">Password confirm</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border rounded px-3 py-2 mb-3"
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                >
                    Update password
                </button>
            </form>
        </div>
    );
}