import { Trash2, Pencil } from "lucide-react";


function getMonthKey(dateStr) {
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month}`;
}

function formatMonthLabel(monthKey) {
    const [year, month] = monthKey.split("-");
    const date = new Date(year, month - 1);
    const label = date.toLocaleDateString("en", { month: "long", year: "numeric" });
    return label.charAt(0).toUpperCase() + label.slice(1);
}

function parseDate(dateStr) {
    const [day, month, year] = dateStr.split("/");
    return new Date(year, month - 1, day);
}

export default function TransactionsByMonth({ transactions, onDelete, onEdit }) {
    const groups = {};

    transactions.forEach((t) => {
        const key = getMonthKey(t.transactionDate);
        if (!groups[key]) groups[key] = { transactions: [], total: 0 };
        const amount = parseFloat(t.amount);
        const signedAmount = t.category.type === "INCOME" ? amount : -amount;
        groups[key].transactions.push(t);
        groups[key].total += signedAmount;
    });

    Object.values(groups).forEach((group) => {
        group.transactions.sort((a, b) => parseDate(b.transactionDate) - parseDate(a.transactionDate));
    });

    const sortedKeys = Object.keys(groups).sort().reverse();

    if (sortedKeys.length === 0) return <p className="text-gray-500 place-self-center">Your transactions will show up here.</p>;

    return (
        <div className="space-y-6">
            {sortedKeys.map((key) => {
                const group = groups[key];
                return (
                    <div key={key}>

                        <div className="flex justify-between rounded-[5px] items-center mb-2 bg-[#124DFF] px-3 py-2">
                            <h3 className="font-semibold text-white">
                                {formatMonthLabel(key)}
                            </h3>
                            <span
                                className={`font-semibold ${
                                    group.total >= 0 ? "text-green-600" : "text-red-600"
                                }`}
                            >
                                {group.total >= 0 ? "+" : "-"}${Math.abs(group.total).toFixed(0)}
                            </span>
                        </div>

                        <table className="w-full text-left p-3">
                            <tbody>
                            {group.transactions.map((t) => (
                                <tr key={t.id} className="group border-b border-gray-300 last:border-0">
                                    <td className="p-2">{t.transactionDate}</td>
                                    <td className="p-2">{t.category.name}</td>
                                    <td className="p-2">{t.description}</td>
                                    <td
                                        className={`p-2 text-right font-medium ${
                                            t.category.type === "EXPENSE" ? "text-red-600" : "text-green-700"
                                        }`}
                                    >
                                        {t.category.type === "EXPENSE" ? "-" : "+"}${t.amount}
                                    </td>
                                    <td className="p-2 w-16 text-right">
                                        <div
                                            className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => onEdit(t)}
                                                className="text-yellow-700 hover:text-blue-600"
                                            >
                                                <Pencil size={16}/>
                                            </button>
                                            <button
                                                onClick={() => onDelete(t.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 size={16}/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                );
            })}
        </div>
    );
}