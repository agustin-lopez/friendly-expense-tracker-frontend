import { Trash2 } from "lucide-react";

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

export default function TransactionsByMonth({ transactions, onDelete }) {
    const groups = {};

    transactions.forEach((t) => {
        const key = getMonthKey(t.transactionDate);
        if (!groups[key]) {
            groups[key] = { transactions: [], total: 0 };
        }
        const amount = parseFloat(t.amount);
        const signedAmount = t.category.type === "INCOME" ? amount : -amount;
        groups[key].transactions.push(t);
        groups[key].total += signedAmount;
    });

    const sortedKeys = Object.keys(groups).sort().reverse();

    if (sortedKeys.length === 0) return <p className="text-gray-500">Your transactions will show up here.</p>;

    return (
        <div className="space-y-6">
            {sortedKeys.map((key) => {
                const group = groups[key];
                return (
                    <div key={key}>

                        <div className="flex justify-between items-center mb-2 bg-gray-200 p-2">
                            <h3 className="font-semibold text-gray-700">
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

                        <table className="w-full text-left">
                            <tbody>
                            {group.transactions.map((t) => (
                                <tr key={t.id} className="group border-b border-gray-300 last:border-0">
                                    <td className="py-2">{t.transactionDate}</td>
                                    <td className="py-2">{t.category.name}</td>
                                    <td className="py-2">{t.description}</td>
                                    <td
                                        className={`py-2 text-right font-medium ${
                                            t.category.type === "EXPENSE" ? "text-red-600" : "text-green-600"
                                        }`}
                                    >
                                        {t.category.type === "EXPENSE" ? "-" : "+"}${t.amount}
                                    </td>
                                    <td className="py-2 w-8 text-right">
                                        <button
                                            onClick={() => onDelete(t.id)}
                                            className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity"
                                        >
                                            <Trash2 size={16} />
                                        </button>
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