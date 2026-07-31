import Tooltip from "./Tooltip";
import { WindowsXPShell322, WordpadXP } from "react-old-icons";

function formatMonthLabel(monthKey) {
    const [year, month] = monthKey.split("-");
    const date = new Date(year, month - 1);
    const label = date.toLocaleDateString("es-AR", { month: "long", year: "numeric" });
    return label.charAt(0).toUpperCase() + label.slice(1);
}

export default function TransactionsByMonth({ monthGroups, onDelete, onEdit }) {
    if (monthGroups.length === 0) return <p className="text-gray-500 m-auto text-center">Your transactions will show up here X)</p>;

    return (
        <div className="space-y-6 m-4">
            {monthGroups.map((group) => (
                /*MONTH CARD*/
                <div key={group.month} className="transaction-month-card rounded-t-[3px]">
                    <div className="flex justify-between items-center mb-2 bg-[#124DFF] rounded-t-[3px] px-3 py-2 transaction-month-bar border-b-2 border-gray-600">
                        <h3 className="font-semibold text-[#153CB2]">
                            {formatMonthLabel(group.month)}
                        </h3>
                        <span className={"font-semibold text-[#153CB2]"}>
                            {group.total >= 0 ? "+" : "-"}${Math.abs(group.total).toFixed(0)}
                        </span>
                    </div>

                    <table className="w-full text-left p-3 table-auto">
                        <tbody>
                        {group.transactions.map((t) => (
                            <tr key={t.id} className="group border-b border-gray-600 last:border-0">
                                <td className="p-1.5 text-[14px] text-center">{t.transactionDate}</td>
                                <td className="p-1.5 text-[14px] text-center">{t.category.name}</td>
                                <td className="p-1.5 text-[14px]">
                                    <Tooltip text={t.description}>
                                        <span className="block truncate">{t.description}</span>
                                    </Tooltip>
                                </td>
                                <td className={"p-1.5 text-right text-[14px]"}>
                                    <span className={`p-0.5 bg-[#f0f0ff] ${t.category.type === "EXPENSE" ? "text-red-600" : "text-green-600"}`}>
                                        {t.category.type === "EXPENSE" ? "-" : "+"}${t.amount}
                                    </span>
                                </td>
                                <td className="pr-2 text-right">
                                    <div className="flex justify-center gap-1 opacity-0 group-hover:opacity-100">
                                        <button
                                            onClick={() => onEdit(t)}
                                            className="hover:text-yellow-400"
                                        >
                                            <WordpadXP size={22} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(t.id)}
                                            className="hover:text-red-500"
                                        >
                                            <WindowsXPShell322 size={22} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}