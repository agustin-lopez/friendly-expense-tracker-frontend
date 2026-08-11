import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {updateProfile, requestPasswordChange} from "../services/userService";
import {FloppyDriveXP} from "react-old-icons";
import DefaultButton from "./DefaultButton.jsx";

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
            await requestPasswordChange(currentPassword, newPassword);
            setPasswordMessage("We've sent you a confirmation email. Please check your inbox to confirm the update!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            setPasswordError(err.message);
        }
    }

    return (
        <div>
            <form onSubmit={handleProfileSubmit} className="flex flex-col gap-5 m-6 text-sm max-xs:text-[12px]">
                <div>
                    <h3 className="text-base font-bold text-gray-700">User data</h3>
                    <div className="custom-underline"></div>
                </div>


                <div className="flex flex-row items-center gap-3 place-content-between">
                    <label className="font-medium" htmlFor="user-name">Name</label>
                    <input
                        id="user-name"
                        type="text"
                        value={name}
                        maxLength="40"
                        onChange={(e) => setName(e.target.value)}
                        className="w-[260px] max-sm:w-[180px] max-xs:w-[150px] border rounded-[2px] px-3 py-1"
                        required
                    />
                </div>

                <div className="flex flex-row items-center gap-3 place-content-between">
                    <span className="font-medium">Email</span>
                    <span>{email}</span>
                </div>

                <div className="w-full h-7 flex items-center text-white text-sm text-center">
                    {profileError && <p className="w-full px-3 py-1 msg-bg-red">{profileError}</p>}
                    {profileMessage && <p className="w-full px-3 py-1 msg-bg-green">{profileMessage}</p>}
                </div>

                <div className="flex flex-row place-content-between items-center">
                    <div className="h-[2px] w-[65%] max-sm:w-[50%] max-xs:w-[40%] bg-gray-300"/>
                    <DefaultButton submit={true}>
                        <FloppyDriveXP size={20} draggable="false"/>
                        Save data
                    </DefaultButton>
                </div>

            </form>

            <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-5 m-6 text-sm max-xs:text-[12px]">
                <div>
                    <h3 className="text-base font-bold text-gray-700">Change password</h3>
                    <div className="custom-underline"></div>
                </div>

                <div className="flex flex-row items-center gap-3 place-content-between">
                    <label className="font-medium" htmlFor="current-password">Current password</label>
                    <input
                        id="current-password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-[260px] max-sm:w-[180px] max-xs:w-[150px] border rounded-[2px] px-3 py-1"
                        required
                    />
                </div>

                <div className="flex flex-row items-center gap-3 place-content-between">
                    <label className="font-medium" htmlFor="new-password">Choose a new one</label>
                    <input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-[260px] max-sm:w-[180px] max-xs:w-[150px] border rounded-[2px] px-3 py-1"
                        required
                    />
                </div>

                <div className="flex flex-row items-center gap-3 place-content-between">
                    <label className="font-medium" htmlFor="repeat-new-password">Re-type it</label>
                    <input
                        id="repeat-new-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-[260px] max-sm:w-[180px] max-xs:w-[150px] border rounded-[2px] px-3 py-1"
                        required
                    />
                </div>

                <div className="w-full h-7 flex items-center text-white text-center">
                    {passwordError && <p className="w-full px-3 py-1 msg-bg-red ">{passwordError}</p>}
                    {passwordMessage && <p className="w-full px-3 py-1 msg-bg-green">{passwordMessage}</p>}
                </div>

                <div className="flex flex-row place-content-between items-center">
                    <div className="h-[2px] w-[65%] max-sm:w-[50%] max-xs:w-[40%] bg-gray-300"/>
                    <DefaultButton submit={true}>
                        <FloppyDriveXP size={20} draggable="false"/>
                        Save password
                    </DefaultButton>
                </div>
            </form>
        </div>
    );
}