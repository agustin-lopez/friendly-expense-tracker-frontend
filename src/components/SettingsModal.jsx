import { useState } from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { User} from "lucide-react";
import ProfileSettings from "./ProfileSettings";
import BlueWindow from "../components/BlueWindow.jsx";

const SECTIONS = [
    { id: "profile", label: "Profile", icon: User },
];

export default function SettingsModal({ isOpen, onClose }) {
    const [activeSection, setActiveSection] = useState("profile");
    const { logoutUser } = useAuth();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <BlueWindow title="Settings" closable={true} onClose={onClose}>
                <div className="bg-white shadow-lg w-[800px] h-[600px] flex overflow-hidden">
                    <div className="w-40 custom-bg-1 flex flex-col justify-between">
                        <div className="flex flex-col">
                            {SECTIONS.map((section) => {
                                const Icon = section.icon;
                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`flex items-center gap-2 px-3 py-2 text-sm text-left ${
                                            activeSection === section.id
                                                ? "bg-blue-100 text-blue-700 font-medium"
                                                : "text-gray-600 hover:bg-slate-200"
                                        }`}
                                    >
                                        <Icon size={16}/>
                                        {section.label}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={logoutUser}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-left text-red-600 hover:bg-red-50 border-t border-gray-300"
                        >
                            <LogOut size={16}/>
                            Log out
                        </button>
                    </div>

                    <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="font-semibold">
                                {SECTIONS.find((s) => s.id === activeSection)?.label}
                            </h2>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4">
                            {activeSection === "profile" && <ProfileSettings/>}
                        </div>
                    </div>

                </div>
            </BlueWindow>
        </div>
    );
}