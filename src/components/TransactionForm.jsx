import { useState } from "react";

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

    function sortCategories(categories) {
        return [...categories].sort((a, b) => {
            if (a.type !== b.type) return a.type === "EXPENSE" ? -1 : 1;
            return a.name.localeCompare(b.name);
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            await onSubmit({
                category: { id: categoryId },
                amount: parseFloat(amount),
                description,
                transactionDate: formatDateForApi(date),
            });
        } catch (err) {
            setError(err.message);
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <label className="block text-sm font-medium mb-1">Category</label>
            <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-1"
                required
            >
                <option value="" disabled>Select</option>
                {sortCategories(categories).map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.name} ({c.type === "EXPENSE" ? "EXPENSE" : "INCOME"})
                    </option>
                ))}
            </select>

            <button
                type="button"
                onClick={onCreateCategory}
                className="text-sm text-blue-600 hover:underline mb-4"
            >
                + New category
            </button>

            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-4"
                required
            />

            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                maxLength={120}
                className="w-full border rounded px-3 py-2 mb-1 resize-none"
            />
            <p className="text-xs text-gray-400 text-right mb-3">{description.length}/120</p>

            <label className="block text-sm font-medium mb-1">Date</label>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-6"
                required
            />

            <div className="flex flex-row justify-center gap-6">
                <button
                    type="button"
                    onClick={onCancel}
                    className="border border-gray-300 rounded hover:bg-gray-50 px-2 py-2"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="blue-button"
                >
                    {initialData ? "Save changes" : "Save"}
                </button>
            </div>
        </form>
    );
}