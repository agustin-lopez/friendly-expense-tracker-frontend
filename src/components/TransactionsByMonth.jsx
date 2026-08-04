import Tooltip from "./Tooltip";
import { WindowsXPShell322, WordpadXP } from "react-old-icons";
import CategoryIcon from "./CategoryIcon";
import { formatCurrency } from "../utils/formatCurrency";

function formatMonthLabel(monthKey) {
    const [year, month] = monthKey.split("-");
    const date = new Date(year, month - 1);
    const label = date.toLocaleDateString("en", { month: "long", year: "numeric" });
    return label.charAt(0).toUpperCase() + label.slice(1);
}

export default function TransactionsByMonth({ monthGroups, onDelete, onEdit }) {
    if (monthGroups.length === 0) return <p className="text-gray-500 m-auto text-center">Your transactions will show up here X)</p>;

    return (
        <div className="space-y-6 m-4">
            {monthGroups.map((group) => (
                /*MONTH CARD*/
                <div key={group.month} className="transaction-month-card rounded-t-[3px] border-[1px] border-gray-500">
                    <div className="flex justify-between items-center bg-[#124DFF] rounded-t-[3px] px-3 py-2 transaction-month-bar border-b-2 border-gray-500">
                        <h3 className="font-semibold text-[#153CB2]">
                            {formatMonthLabel(group.month)}
                        </h3>
                        <span className={"font-semibold text-[#153CB2]"}>
                            {group.total >= 0 ? "+" : "-"}${formatCurrency(Math.abs(group.total))}
                        </span>
                    </div>

                    <table className="w-full text-left p-3">
                        <tbody>
                        {group.transactions.map((t) => (
                            <tr key={t.id} className="group border-b border-gray-500 last:border-0">
                                <td className="py-1.5 px-3 text-[14px] text-left w-px whitespace-nowrap">{t.transactionDate}</td>
                                <td className="p-1.5 text-[14px] text-left">
                                    <div className="flex gap-2 max-w-[120px]">
                                        <CategoryIcon name={t.category.icon} size={25}/>
                                        <Tooltip text={t.category.name}>
                                            <span className="flex truncate">{t.category.name}</span>
                                        </Tooltip>
                                    </div>
                                </td>
                                <td className="p-1.5 text-[14px]">
                                    <Tooltip text={t.description}>
                                        <span className="flex items-center truncate max-w-[110px]">{t.description}</span>
                                    </Tooltip>
                                </td>
                                <td className={"p-1.5 text-right text-[14px] w-px whitespace-nowrap"}>
                                    <span
                                        className={`bg-[#f0f0ff] ${t.category.type === "EXPENSE" ? "text-red-600" : "text-green-600"}`}>
                                        {t.category.type === "EXPENSE" ? "-" : "+"}${formatCurrency(t.amount)}
                                    </span>
                                </td>
                                <td className="pr-2 text-right w-[52px]">
                                    <div className="flex justify-center gap-1 opacity-0 group-hover:opacity-100">
                                        <button
                                            onClick={() => onEdit(t)}
                                        >
                                            <WordpadXP size={20}/>
                                        </button>
                                        <button
                                            onClick={() => onDelete(t.id)}
                                        >
                                            <WindowsXPShell322 size={20}/>
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