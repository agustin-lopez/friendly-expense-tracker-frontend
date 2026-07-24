import { useState } from "react";

export default function CategoryForm({ onSubmit, onCancel }) {
    const [name, setName] = useState("");
    const [type, setType] = useState("EXPENSE");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            await onSubmit({ name, type });
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <label className="block text-sm font-medium mb-1">Name</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-4"
                required
            />

            <label className="block text-sm font-medium mb-1">Type</label>
            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-6"
            >
                <option value="EXPENSE">Expense</option>
                <option value="INCOME">Income</option>
            </select>

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
                    Save
                </button>
            </div>
        </form>
    );
}