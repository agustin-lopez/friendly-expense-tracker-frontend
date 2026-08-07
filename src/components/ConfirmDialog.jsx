import BlueWindow from "./BlueWindow";
import CategoryIcon from "./CategoryIcon.jsx";
import DefaultButton from "./DefaultButton.jsx";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";

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
    useLockBodyScroll(isOpen);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <BlueWindow title={title} closable={true} onClose={onCancel} className="w-100">
                <div className="p-4">
                    <p className="text-sm text-gray-700 mb-6">{message}</p>

                    <div className="flex justify-center gap-3">
                        <DefaultButton onClickAction={onCancel}>
                            {cancelLabel}
                        </DefaultButton>

                        <DefaultButton onClickAction={onConfirm}>
                            <CategoryIcon name={confirmIcon} size={20}/>
                            {confirmLabel}
                        </DefaultButton>
                    </div>
                </div>
            </BlueWindow>
        </div>
    );
}