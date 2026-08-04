import { useState } from "react";
import { CATEGORY_ICONS } from "../constants/categoryIcons.js";
import CategoryIcon from "./CategoryIcon.jsx";
import {FloppyDriveXP} from "react-old-icons";

export default function CategoryForm({ onSubmit, onCancel, initialData }) {
    const [name, setName] = useState(initialData?.name || "");
    const [type, setType] = useState(initialData?.type || "EXPENSE");
    const [icon, setIcon] = useState(initialData?.icon || CATEGORY_ICONS[0].name);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            await onSubmit({ name, type, icon });
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}
              className="flex flex-col gap-4 p-4 border-[1px] border-gray-300"
        >
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <div className="flex flex-row items-center place-content-between">
                <label className="text-sm">Name</label>
                <input
                    type="text"
                    value={name}
                    maxLength="50"
                    onChange={(e) => setName(e.target.value)}
                    className="w-[260px] border rounded-[2px] px-3 py-1 text-[15px]"
                    required
                />
            </div>

            <div className="flex flex-row items-center place-content-between">
                <label className="text-sm">Type</label>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-[260px] border rounded-[2px] px-3 py-1 text-[15px] h-[32.5px]"
                >
                    <option value="EXPENSE">Expense</option>
                    <option value="INCOME">Income</option>
                </select>
            </div>

            <div className="flex flex-row place-content-between items-start">
                <label className="text-sm inline-block align-top">Icon</label>
                <div className="w-[260px] grid grid-cols-4 gap-2 p-2 border rounded-[2px] max-h-32 overflow-y-auto">
                    {CATEGORY_ICONS.map((iconOption) => (
                        <button
                            key={iconOption.name}
                            type="button"
                            onClick={() => setIcon(iconOption.name)}
                            title={iconOption.label}
                            className={`flex items-center justify-center p-2 rounded-[2px] ${
                                icon === iconOption.name
                                    ? "bg-blue-100 border-2 border-blue-500"
                                    : "border-2 border-transparent hover:bg-gray-100"
                            }`}
                        >
                            <CategoryIcon name={iconOption.name} size={30}/>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-row justify-center gap-4 p-2">
                <div className="white-button-wrap">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="white-button"
                    >
                        Cancel
                    </button>
                </div>
                <div className="white-button-wrap">
                    <button
                        type="submit"
                        className="white-button"
                    >
                        <FloppyDriveXP size={20}/>
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
}