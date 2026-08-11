import { useState } from "react";
import {FloppyDriveXP, Windows31ProgmanIcon} from "react-old-icons";
import { sortCategories } from "../utils/sortCategories";
import DefaultButton from "./DefaultButton.jsx";
import CalculatorPopover from "./CalculatorPopover";
import CategoryIcon from "./CategoryIcon.jsx";

export default function TransactionForm({
                                            categories,
                                            onSubmit,
                                            onCancel,
                                            onCreateCategory,
                                            draft,
                                            onDraftChange,
                                        }) {

    const [error, setError] = useState("");
    const selectedCategory = categories.find((c) => c.id === draft.categoryId);

    function updateDraft(field, value) {
        onDraftChange({ ...draft, [field]: value });
    }

    function formatDateForApi(isoDate) {
        const [year, month, day] = isoDate.split("-");
        return `${day}/${month}/${year}`;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            await onSubmit({
                category: draft.categoryId ? { id: draft.categoryId } : null,
                amount: parseFloat(draft.amount),
                description: draft.description,
                transactionDate: formatDateForApi(draft.date),
            });
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <form
            name="new-transaction"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-4 max-xs:px-1.5 border-[1px] border-gray-300 text-sm max-xs:text-xs"
        >

            <div className="flex flex-row items-center place-content-between">
                <label htmlFor="category-select">Category</label>
                <div className="w-[260px] max-xs:w-[240px] flex flex-row place-content-between">
                    <select
                        id="category-select"
                        value={draft.categoryId}
                        onChange={(e) => updateDraft("categoryId", e.target.value)}
                        className="w-[45%] border rounded-[2px] p-1 pr-4"
                        required
                    >
                        <option value="" disabled hidden>Select</option>
                        <optgroup label="EXPENSES" className="text-xs">
                            {sortCategories(categories).filter(c => c.type === "EXPENSE").map((c) => (
                                <option key={c.id} value={c.id} className="text-sm max-sm:text-xs">{c.name}</option>
                            ))}
                        </optgroup>
                        <optgroup label="INCOME" className="text-xs">
                            {sortCategories(categories).filter(c => c.type === "INCOME").map((c) => (
                                <option key={c.id} value={c.id} className="text-sm max-sm:text-xs">{c.name}</option>
                            ))}
                        </optgroup>
                    </select>
                    <div className="w-[32.5px] h-[32.5px] border-1 rounded-[2px] flex items-center place-content-center">
                        {selectedCategory ? (<CategoryIcon name={selectedCategory.icon} size={24}/>)
                            : (
                                <Windows31ProgmanIcon size={24}/>
                            )}
                    </div>

                    <DefaultButton onClickAction={onCreateCategory}>
                        Add category
                    </DefaultButton>
                </div>
            </div>

            <div className="flex flex-row items-center gap-3 place-content-between">
                <label htmlFor="amount">Amount</label>
                <div className="w-[260px] max-xs:w-[240px] flex flex-row place-content-between">
                    <input
                        id="amount"
                        type="number"
                        step="1"
                        min="0"
                        max="99999999"
                        value={draft.amount}
                        onChange={(e) => updateDraft("amount", e.target.value)}
                        className="w-[83%] border rounded-[2px] px-3 py-1"
                        required
                    />
                    <CalculatorPopover currentValue={draft.amount} onApply={(result) => updateDraft("amount", result)}/>
                </div>
            </div>

            <div className="flex flex-row gap-3 place-content-between">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    value={draft.description}
                    onChange={(e) => updateDraft("description", e.target.value)}
                    rows={3}
                    maxLength={120}
                    className="w-[260px] max-xs:w-[240px] text-sm border rounded-[2px] px-3 py-2 resize-none"
                />
            </div>

            <div className="flex flex-row items-center gap-3 place-content-between">
                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    type="date"
                    value={draft.date}
                    onChange={(e) => updateDraft("date", e.target.value)}
                    className="w-[260px] max-xs:w-[240px] border rounded-[2px] px-3 py-1"
                    required
                />
            </div>

            <div className="flex flex-row justify-center gap-4 p-2">
                <DefaultButton onClickAction={onCancel}>
                    Cancel
                </DefaultButton>
                <DefaultButton submit={true}>
                    <FloppyDriveXP size={20} draggable={false}/>
                    {draft.id ? "Save changes" : "Save"}
                </DefaultButton>
            </div>

            {error && <p className="w-full px-3 py-1 text-white msg-bg-red text-center">{error}</p>}
        </form>
    );
}