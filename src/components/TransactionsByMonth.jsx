import { Trash2, Pencil } from "lucide-react";
import Tooltip from "./Tooltip";

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
        <div className="space-y-6 m-2">
            {sortedKeys.map((key) => {
                const group = groups[key];
                return (
                    /*MONTH CARD*/
                    <div key={key} className="transaction-month-card rounded-t-[3px]">

                        <div className="flex justify-between items-center mb-2 bg-[#124DFF] rounded-t-[3px] px-3 py-2 transaction-month-bar border-b-2 border-gray-600">
                            <h3 className="font-semibold text-[#153CB2]">
                                {formatMonthLabel(key)}
                            </h3>
                            <span className={"font-semibold text-[#153CB2]"}>
                                {group.total >= 0 ? "+" : "-"}${Math.abs(group.total).toFixed(0)}
                            </span>
                        </div>

                        <table className="w-full text-left p-3">
                            <tbody>
                            {group.transactions.map((t) => (
                                <tr key={t.id} className="group border-b border-gray-600 last:border-0">
                                    <td className="p-2">{t.transactionDate}</td>
                                    <td className="p-2">{t.category.name}</td>
                                    <td className="py-2 max-w-[200px]">
                                        <Tooltip text={t.description}>
                                            <span className="block truncate">{t.description}</span>
                                        </Tooltip>
                                    </td>
                                    <td className={"p-2 text-right font-medium"}>
                                        <span className={`p-0.5 text-white ${t.category.type === "EXPENSE" ? "bg-red-600" : "bg-[#21a336]"}`}>
                                            {t.category.type === "EXPENSE" ? "-" : "+"}${t.amount}
                                        </span>
                                    </td>
                                    <td className="p-2 w-16 text-right">
                                        <div
                                            className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => onEdit(t)}
                                                className="hover:text-yellow-400"
                                            >
                                                <Pencil size={16}/>
                                            </button>
                                            <button
                                                onClick={() => onDelete(t.id)}
                                                className="hover:text-red-500"
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