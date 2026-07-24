import {X} from "lucide-react";

export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="blue-window">
                {/*TITLE + BUTTON*/}

                <div className={"w-100% flex flex-row justify-between content-center p-1 mb-1"}>
                    <h2 className="text-white">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-xl leading-none"
                    >
                        <div className="bg-red-400 p-0.5 rounded-[3px] border-solid border-1 border-white">
                            <X size={20} color={"white"}/>
                        </div>
                    </button>

                </div>
                <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}