import BlueWindow from "../components/BlueWindow.jsx";
import {useLockBodyScroll} from "../hooks/useLockBodyScroll.js";

export default function Modal({ isOpen, onClose, title, children }) {

    useLockBodyScroll(isOpen);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center z-50">
            <BlueWindow title={title} className="w-[30rem]" closable={true} onClose={onClose}>
                <div className="shadow-lg w-full p-6 max-sm:p-0">
                    {children}
                </div>
            </BlueWindow>
        </div>
    );
}