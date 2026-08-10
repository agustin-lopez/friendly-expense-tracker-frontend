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
            setPasswordMessage("We've sent you a confirmation email. Please check your inbox to confirm the change!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            setPasswordError(err.message);
        }
    }

    return (
        <>
            <form onSubmit={handleProfileSubmit} className="bg-white flex flex-col gap-5 m-6 text-sm max-xs:text-[12px]">
                <div>
                    <h3 className="text-base font-semibold text-gray-700">User data</h3>
                    <div className="custom-underline"></div>
                </div>


                <div className="flex flex-row items-center gap-3 place-content-between">
                    <label className="font-medium">Name</label>
                    <input
                        type="text"
                        value={name}
                        maxLength="100"
                        onChange={(e) => setName(e.target.value)}
                        className="w-[260px] max-sm:w-[180px] max-xs:w-[150px] border rounded-[2px] px-3 py-1"
                        required
                    />
                </div>

                <div className="flex flex-row items-center gap-3 place-content-between">
                    <label className="font-medium">Email</label>
                    <p>{email}</p>
                </div>

                <div className="w-full h-7 flex items-center">
                    {profileError && <p className="w-full px-3 py-1 text-white msg-bg-red text-sm text-center">{profileError}</p>}
                    {profileMessage && <p className="w-full px-3 py-1 text-white msg-bg-green text-sm text-center">{profileMessage}</p>}
                </div>

                <div className="flex flex-row place-content-between items-center">
                    <div className="h-[2px] w-[65%] max-sm:w-[50%] max-xs:w-[40%] bg-gray-300"/>
                    <DefaultButton submit={true}>
                        <FloppyDriveXP size={20} draggable="false"/>
                        Save data
                    </DefaultButton>
                </div>

            </form>

            <form onSubmit={handlePasswordSubmit} className="bg-white flex flex-col gap-5 m-6 text-sm max-xs:text-[12px]">
                <div>
                    <h3 className="text-base font-semibold text-gray-700">Change password</h3>
                    <div className="custom-underline"></div>
                </div>

                <div className="flex flex-row items-center gap-3 place-content-between">
                    <label className="font-medium">Current password</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-[260px] max-sm:w-[180px] max-xs:w-[150px] border rounded-[2px] px-3 py-1 text-[15px]"
                        required
                    />
                </div>

                <div className="flex flex-row items-center gap-3 place-content-between">
                    <label className="font-medium">Choose a new one</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-[260px] max-sm:w-[180px] max-xs:w-[150px] border rounded-[2px] px-3 py-1 text-[15px]"
                        required
                    />
                </div>

                <div className="flex flex-row items-center gap-3 place-content-between">
                    <label className="font-medium">Re-type it</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-[260px] max-sm:w-[180px] max-xs:w-[150px] border rounded-[2px] px-3 py-1 text-[15px]"
                        required
                    />
                </div>

                <div className="w-full h-7 flex items-center">
                    {passwordError && <p className="w-full px-3 py-1 text-white msg-bg-red text-center">{passwordError}</p>}
                    {passwordMessage && <p className="w-full px-3 py-1 text-white msg-bg-green text-center">{passwordMessage}</p>}
                </div>

                <div className="flex flex-row place-content-between items-center">
                    <div className="h-[2px] w-[65%] max-sm:w-[50%] max-xs:w-[40%] bg-gray-300"/>
                    <DefaultButton submit={true}>
                        <FloppyDriveXP size={20} draggable="false"/>
                        Save password
                    </DefaultButton>
                </div>

            </form>
        </>
    );
}