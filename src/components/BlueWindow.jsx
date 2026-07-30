import { X } from "lucide-react";
import Tooltip from "./Tooltip";

export default function XPWindow({ title, closable = false, onClose, children, className = "" }) {
    return (
        <div className={`blue-window mx-auto ${className}`}>
            <div className="blue-window-bar w-100% flex flex-row justify-between content-center py-2 px-3">
                <h2 className="text-white flex flex-row">{title}</h2>

                {closable ? (
                    <button onClick={onClose}>
                        <div className="red-close p-0.3 rounded-[3px] border-solid border-1 border-white hover:bg-red-500">
                            <X size={20} color="white" />
                        </div>
                    </button>
                ) : (
                    <Tooltip text="This one is for decoration only! x.x">
                        <div className="red-close p-0.3 rounded-[3px] border-solid border-1 border-white">
                            <X size={20} color="white" />
                        </div>
                    </Tooltip>
                )}
            </div>

            <div className="bg-white shadow-md m-1 mt-0 border-solid border-[#0034b0] border-1">
                {children}
            </div>
        </div>
    );
}