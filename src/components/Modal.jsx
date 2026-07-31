import BlueWindow from "../components/BlueWindow.jsx";

export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <BlueWindow title={title} className="max-w-[40rem]" closable={true} onClose={onClose}>
                <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                    {children}
                </div>
            </BlueWindow>
        </div>
    );
}