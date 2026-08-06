import { useState } from "react";
import {FloppyDriveXP} from "react-old-icons";
import { sortCategories } from "../utils/sortCategories";
import DefaultButton from "./DefaultButton.jsx";
import CalculatorPopover from "./CalculatorPopover";

function formatDateForInput(apiDate) {
    if (!apiDate) return "";
    const [day, month, year] = apiDate.split("/");
    return `${year}-${month}-${day}`;
}

export default function TransactionForm({ categories, onSubmit, onCancel, onCreateCategory, initialData }) {
    const [categoryId, setCategoryId] = useState(initialData?.category?.id || "");
    const [amount, setAmount] = useState(initialData?.amount || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [date, setDate] = useState(formatDateForInput(initialData?.transactionDate));
    const [error, setError] = useState("");

    function formatDateForApi(isoDate) {
        const [year, month, day] = isoDate.split("-");
        return `${day}/${month}/${year}`;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            await onSubmit({
                category: categoryId ? { id: categoryId } : null,
                amount: parseFloat(amount),
                description,
                transactionDate: formatDateForApi(date),
            });
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
                <label className="text-sm">Category</label>
                <div className="w-[260px] flex flex-row place-content-between">
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="w-[60%] border rounded-[2px] p-1 pr-4 text-[15px] h-[32.5px]"
                        required
                    >
                        <option value="" disabled selected hidden>Uncategorized</option>
                        {sortCategories(categories).map((c) => (
                            <option key={c.id} value={c.id}>
                                ({c.type === "EXPENSE" ? "EXPENSE" : "INCOME"}) {c.name}
                            </option>
                        ))}
                    </select>
                    <DefaultButton onClickAction={onCreateCategory}>
                        Add category
                    </DefaultButton>
                </div>

            </div>

            <div className="flex flex-row items-center gap-3 place-content-between">
                <label className="text-sm">Amount</label>
                <div className="w-[260px] flex flex-row place-content-between">
                    <input
                        type="number"
                        step="1"
                        min="0"
                        max="99999999"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-[83%] border rounded-[2px] px-3 py-1 text-[15px]"
                        required
                    />
                    <CalculatorPopover currentValue={amount} onApply={(result) => setAmount(result)} />
                </div>
            </div>

            <div className="flex flex-row gap-3 place-content-between items-start">
                <label className="text-sm">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    maxLength={120}
                    className="w-[260px] text-sm border rounded-[2px] px-3 py-2 resize-none"
                />
            </div>

            <div className="flex flex-row items-center gap-3 place-content-between">
                <label className="block text-sm font-medium">Date</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-[260px] border rounded-[2px] px-3 py-1 text-[15px]"
                    required
                />
            </div>

            <div className="flex flex-row justify-center gap-4 p-2">
                <DefaultButton onClickAction={onCancel}>
                    Cancel
                </DefaultButton>
                <DefaultButton submit={true}>
                    <FloppyDriveXP size={20} />
                    {initialData ? "Save changes" : "Save"}
                </DefaultButton>
            </div>
        </form>
    );
}