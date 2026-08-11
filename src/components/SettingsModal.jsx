import { useState } from "react";
import {WindowsXPShutDown, WindowsXPUsers, SystemControlPanel} from 'react-old-icons';
import { useAuth } from "../context/AuthContext";
import ProfileSettings from "./ProfileSettings";
import BlueWindow from "../components/BlueWindow.jsx";
import {useLockBodyScroll} from "../hooks/useLockBodyScroll.js";
import DisplaySettings from "./DisplaySettings.jsx";

const SECTIONS = [
    { id: "profile", label: "Profile", icon: WindowsXPUsers },
    { id: "display", label: "Display", icon: SystemControlPanel },
];

export default function SettingsModal({ isOpen, onClose }) {
    const [activeSection, setActiveSection] = useState("profile");
    const { logoutUser } = useAuth();

    useLockBodyScroll(isOpen);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <BlueWindow title="Settings" closable={true} onClose={onClose}>
                <div className="bg-white max-w-[650px] h-[600px] flex">
                    <div className="w-40 max-xs:w-12 custom-bg-1 flex flex-col justify-between">
                        <div className="flex flex-col">
                            {SECTIONS.map((section) => {
                                const Icon = section.icon;
                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`flex items-center gap-3 px-3 py-2 max-xs:p-1 text-m max-xs:justify-center ${
                                            activeSection === section.id
                                                ? "bg-white text-black"
                                                : "text-gray-600 hover:bg-slate-200"
                                        }`}
                                    >
                                        <Icon size={28} draggable="false" />
                                        <span className="max-xs:hidden">
                                            {section.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={logoutUser}
                            className="red-close flex justify-center place-items-center gap-2 px-3 py-2 max-xs:p-1 text-sm text-white"
                        >
                            <WindowsXPShutDown size={28} draggable="false" />
                            <span className="max-xs:hidden">Log out</span>
                        </button>
                    </div>


                    <div className="flex-1 overflow-y-auto">
                        {activeSection === "profile" && <ProfileSettings />}
                        {activeSection === "display" && <DisplaySettings />}
                    </div>
                </div>
            </BlueWindow>
        </div>
    );
}