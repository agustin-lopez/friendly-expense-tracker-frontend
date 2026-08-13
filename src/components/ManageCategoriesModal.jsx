import { useState } from "react";
import BlueWindow from "./BlueWindow";
import CategoryForm from "./CategoryForm";
import ConfirmDialog from "./ConfirmDialog";
import CategoryIcon from "./CategoryIcon";
import {WindowsRecycleBin2, WindowsXPFolder2, WordpadXP} from "react-old-icons";
import Tooltip from "./Tooltip.jsx";
import DefaultButton from "./DefaultButton.jsx";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";

export default function ManageCategoriesModal({
                                                  isOpen,
                                                  onClose,
                                                  categories,
                                                  onCreate,
                                                  onUpdate,
                                                  onDelete,
                                              }) {
    const [view, setView] = useState("list");
    const [editingCategory, setEditingCategory] = useState(null);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    useLockBodyScroll(isOpen);

    if (!isOpen) return null;

    function handleEditClick(category) {
        setEditingCategory(category);
        setView("form");
    }

    function handleAddClick() {
        setEditingCategory(null);
        setView("form");
    }

    async function handleFormSubmit(data) {
        if (editingCategory) {
            await onUpdate(editingCategory.id, data);
        } else {
            await onCreate(data);
        }
        setView("list");
        setEditingCategory(null);
    }

    async function confirmDelete() {
        await onDelete(categoryToDelete);
        setCategoryToDelete(null);
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center z-50">
            <BlueWindow
                title={view === "list" ? "Manage categories" : (editingCategory ? "Edit category" : "New category")}
                closable={true}
                onClose={onClose}
                className="w-[32rem]"
            >
                <div className="flex flex-col gap-5 w-full p-6 max-xs:p-0">
                    {view === "list" ? (
                        <div className="border-1 border-gray-300">
                            <div className="h-100 overflow-y-auto p-4">
                                {categories.length === 0 ? (
                                    <p className="text-gray-500 text-center text-sm">You have no categories yet :o </p>
                                ) : (
                                    <div className="space-y-5">
                                        <div>
                                            <h3 className="font-bold">EXPENSES</h3>
                                            {categories.map((c) => c.type == 'EXPENSE' && (
                                                <div
                                                    className="group flex items-center justify-between py-2 px-3 border-b border-gray-300 last:border-0"
                                                    key={c.id}>
                                                    <div className="flex items-center gap-3">
                                                        <CategoryIcon name={c.icon} size={22}/>
                                                        <Tooltip text={c.name}>
                                                            <span className="flex text-m max-w-[200px] truncate overflow-hidden">
                                                                {c.name}
                                                            </span>
                                                        </Tooltip>
                                                    </div>
                                                    <div
                                                        className="flex justify-center gap-1 md:opacity-0 group-hover:opacity-100">
                                                        <button
                                                            onClick={() => handleEditClick(c)}
                                                        >
                                                            <WordpadXP size={20} draggable={false}/>
                                                        </button>
                                                        <button
                                                            onClick={() => setCategoryToDelete(c.id)}
                                                        >
                                                            <WindowsRecycleBin2 size={20} draggable={false}/>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <h3 className="font-bold">INCOME</h3>
                                            {categories.map((c) => c.type == 'INCOME' && (
                                                <div
                                                    className="group flex items-center justify-between py-2 px-3 border-b border-gray-300 last:border-0"
                                                    key={c.id}>
                                                    <div className="flex items-center gap-3">
                                                        <CategoryIcon name={c.icon} size={22}/>
                                                        <Tooltip text={c.name}>
                                                            <span className="flex text-m max-w-[200px] truncate overflow-hidden">
                                                                {c.name}
                                                            </span>
                                                        </Tooltip>
                                                    </div>
                                                    <div
                                                        className="flex justify-center gap-1 md:opacity-0 group-hover:opacity-100">
                                                        <button
                                                            onClick={() => handleEditClick(c)}
                                                        >
                                                            <WordpadXP size={20} draggable={false}/>
                                                        </button>
                                                        <button
                                                            onClick={() => setCategoryToDelete(c.id)}
                                                        >
                                                            <WindowsRecycleBin2 size={20} draggable={false}/>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-row justify-center gap-4 p-4">
                                <DefaultButton onClickAction={onClose}>
                                    Close
                                </DefaultButton>

                                <DefaultButton onClickAction={handleAddClick}>
                                    <WindowsXPFolder2 size={20} draggable={false}/>
                                    Add category
                                </DefaultButton>
                            </div>
                        </div>
                    ) : (
                        <CategoryForm
                            onSubmit={handleFormSubmit}
                            onCancel={() => setView("list")}
                            initialData={editingCategory}
                        />
                    )}
                </div>
            </BlueWindow>

            <ConfirmDialog
                isOpen={categoryToDelete !== null}
                title="Delete category?"
                message="Are you sure you want to delete this category? Transactions using it wii be marked as 'Uncategorized' and won't affect your balance."
                onConfirm={confirmDelete}
                confirmIcon="WindowsRecycleBin2"
                onCancel={() => setCategoryToDelete(null)}
            />
        </div>
    );
}