import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile, changePassword } from "../services/userService";
import {FloppyDriveXP} from "react-old-icons";

export default function ProfileSettings() {
    const { user, refreshUser  } = useAuth();
    const [name, setName] = useState(user?.name || "");
    const [email,] = useState(user?.email || "");
    const [profileMessage, setProfileMessage] = useState("");
    const [profileError, setProfileError] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordError, setPasswordError] = useState("");

    async function handleProfileSubmit(e) {
        e.preventDefault();
        setProfileError("");
        setProfileMessage("");
        try {
            await updateProfile(name);
            await refreshUser();
            setProfileMessage("Update successful!");
        } catch (err) {
            setProfileError(err.message);
        }
    }

    async function handlePasswordSubmit(e) {
        e.preventDefault();
        setPasswordError("");
        setPasswordMessage("");

        if (newPassword !== confirmPassword) {
            setPasswordError("Passwords don't match");
            return;
        }

        try {
            await changePassword(user.id, currentPassword, newPassword);
            setPasswordMessage("Password updated succesfully!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            setPasswordError(err.message);
        }
    }

    return (
        <div className="space-y-6">
            <form onSubmit={handleProfileSubmit}
                  className="bg-white flex flex-col gap-5 m-6"
            >
                <div>
                    <h3 className="text-sl font-semibold text-gray-700">User data</h3>
                    <div className="custom-underline"></div>
                </div>


                <div className="flex flex-row items-center gap-3 place-content-between">
                    <label className="text-sm font-medium">Name</label>
                    <input
                        type="text"
                        value={name}
                        maxLength="100"
                        onChange={(e) => setName(e.target.value)}
                        className="w-[260px] border rounded-[2px] px-3 py-1 text-[15px]"
                        required
                    />
                </div>

                <div className="flex flex-row items-center gap-3 place-content-between">
                    <label className="text-sm font-medium">Email</label>
                    <p>{email}</p>
                </div>

                <div className="flex flex-row place-content-between items-center">
                    <div className="h-[2px] w-[65%] bg-gray-300"/>
                    <div className="white-button-wrap">
                        <button
                            type="submit"
                            className="white-button"
                        >
                            <FloppyDriveXP size={20}/>
                            Save data
                        </button>
                    </div>
                </div>


                {profileError && <p className="text-red-500 text-sm mb-2">{profileError}</p>}
                {profileMessage && <p className="text-green-600 text-sm mb-2">{profileMessage}</p>}

            </form>

            <form onSubmit={handlePasswordSubmit}
                  className="bg-white flex flex-col gap-5 m-6"
            >
                <div>
                    <h3 className="text-sl font-semibold text-gray-700">Change password</h3>
                    <div className="custom-underline"></div>
                </div>

                <div className="flex flex-row items-center gap-3 place-content-between">
                    <label className="text-sm font-medium">Current password</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-[260px] border rounded-[2px] px-3 py-1 text-[15px]"
                        required
                    />
                </div>

                <div className="flex flex-row items-center gap-3 place-content-between">
                    <label className="text-sm font-medium">Choose a new one</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-[260px] border rounded-[2px] px-3 py-1 text-[15px]"
                        required
                    />
                </div>

                <div className="flex flex-row items-center gap-3 place-content-between">
                    <label className="text-sm font-medium">Re-type it</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-[260px] border rounded-[2px] px-3 py-1 text-[15px]"
                        required
                    />
                </div>

                <div className="flex flex-row place-content-between items-center">
                    <div className="h-[2px] w-[65%] bg-gray-300"/>
                    <div className="white-button-wrap">
                        <button
                            type="submit"
                            className="white-button"
                        >
                            <FloppyDriveXP size={20}/>
                            Save password
                        </button>
                    </div>
                </div>

                {passwordError && <p className="text-red-500 text-sm mb-2">{passwordError}</p>}
                {passwordMessage && <p className="text-green-600 text-sm mb-2">{passwordMessage}</p>}

            </form>
        </div>
    );
}