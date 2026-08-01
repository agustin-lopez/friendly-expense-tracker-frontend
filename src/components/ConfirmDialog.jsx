import BlueWindow from "./BlueWindow";
import CategoryIcon from "./CategoryIcon.jsx";

export default function ConfirmDialog({
                                          isOpen,
                                          title = "Confirm",
                                          message,
                                          onConfirm,
                                          onCancel,
                                          confirmLabel = "Delete",
                                          cancelLabel = "Cancel",
                                          confirmIcon = null
                                      }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <BlueWindow title={title} closable={true} onClose={onCancel} className="w-80">
                <div className="p-4">
                    <p className="text-sm text-gray-700 mb-6">{message}</p>

                    <div className="flex justify-center gap-3">
                        <div className="white-button-wrap">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="white-button"
                            >
                                {cancelLabel}
                            </button>
                        </div>

                        <div className="white-button-wrap">
                            <button
                                type="button"
                                onClick={onConfirm}
                                className="white-button"
                            >
                            <CategoryIcon name={confirmIcon} size={20}/>
                            {confirmLabel}
                            </button>
                        </div>
                    </div>
                </div>
            </BlueWindow>
        </div>
    );
}