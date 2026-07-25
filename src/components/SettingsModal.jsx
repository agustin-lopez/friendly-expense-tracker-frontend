import { useState } from "react";
import { User, X } from "lucide-react";
import ProfileSettings from "./ProfileSettings";
import Tooltip from "./Tooltip.jsx";

const SECTIONS = [
    { id: "profile", label: "Profile", icon: User },
];

export default function SettingsModal({ isOpen, onClose }) {
    const [activeSection, setActiveSection] = useState("profile");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="blue-window">

                <div className={"w-100% flex flex-row justify-between content-center p-1 mb-1"}>
                    <h2 className="text-white flex flex-row">Settings</h2>
                    <div className="bg-red-400 p-0.5 rounded-[3px] border-solid border-1 border-white">
                        <X size={20} color={"white"}/>
                    </div>
                </div>

                <div className="bg-white rounded-b-[3px] shadow-lg w-[800px] h-[600px] flex overflow-hidden">
                    <div className="w-50 custom-bg-1 flex flex-col">
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
                                    <Icon size={16} />
                                    {section.label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="font-semibold">
                                {SECTIONS.find((s) => s.id === activeSection)?.label}
                            </h2>
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4">
                            {activeSection === "profile" && <ProfileSettings />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}