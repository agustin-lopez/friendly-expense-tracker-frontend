import { useState } from "react";
import {WindowsXPShutDown, WindowsXPUsers} from 'react-old-icons';
import { useAuth } from "../context/AuthContext";
import ProfileSettings from "./ProfileSettings";
import BlueWindow from "../components/BlueWindow.jsx";

const SECTIONS = [
    { id: "profile", label: "Profile", icon: WindowsXPUsers },
];

export default function SettingsModal({ isOpen, onClose }) {
    const [activeSection, setActiveSection] = useState("profile");
    const { logoutUser } = useAuth();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <BlueWindow title="Settings" closable={true} onClose={onClose}>
                <div className="bg-white shadow-lg w-[650px] h-[600px] flex overflow-hidden">
                    <div className="w-35 custom-bg-1 flex flex-col justify-between">
                        <div className="flex flex-col">
                            {SECTIONS.map((section) => {
                                const Icon = section.icon;
                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`flex items-center gap-3 px-3 py-2 text-m ${
                                            activeSection === section.id
                                                ? "bg-white text-blue-600 font-medium border-l-[3px] border-blue-600"
                                                : "text-gray-600 hover:bg-slate-200"
                                        }`}
                                    >
                                        <Icon size={28}/>
                                        {section.label}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={logoutUser}
                            className="flex items-center gap-2 px-3 py-2 text-sm bg-red-400 hover:bg-red-300 text-white"
                        >
                            <WindowsXPShutDown size={28} />
                            Log out
                        </button>
                    </div>


                    <div className="flex-1 overflow-y-auto py-4 px-8">
                        {activeSection === "profile" && <ProfileSettings/>}
                    </div>

                </div>
            </BlueWindow>
        </div>
    );
}