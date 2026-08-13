import Tooltip from "./Tooltip";
import {WindowsRecycleBin2, WordpadXP} from "react-old-icons";
import {formatCurrency} from "../utils/formatCurrency";
import CategoryLabel from "./CategoryLabel";
import { useCurrency } from "../context/CurrencyContext.jsx";

function formatMonthLabel(monthKey) {
    const [year, month] = monthKey.split("-");
    const date = new Date(year, month - 1);
    const label = date.toLocaleDateString("en", {month: "long", year: "numeric"});

    return label.charAt(0).toUpperCase() + label.slice(1);
}

export default function TransactionsByMonth({monthGroups, onDelete, onEdit}) {

    const {currency} = useCurrency();

    if (monthGroups.length === 0) return <p className="text-gray-500 m-auto my-4 text-center">Your transactions will
        show up here X)</p>;

    return (
        <div className="space-y-4 px-4 max-xs:px-2">
            {monthGroups.map((group) => (
                /*MONTH CARD*/
                <div key={group.month} className="transaction-month-card border-[1px] border-gray-500">
                    {/*CARD HEADER*/}
                    <div
                        className="flex justify-between items-center px-3 py-2 transaction-month-bar border-b-2 border-gray-500 font-semibold text-[#153CB2]">
                        <h3>{formatMonthLabel(group.month)}</h3>
                        <span>{group.total >= 0 ? "+" : "-"}{formatCurrency(Math.abs(group.total), currency.symbol)}</span>
                    </div>

                    {/*CARD CONTENT*/}
                    <table className="w-full">
                        <tbody>
                            {group.transactions.map((t) => (
                                <tr key={t.id}
                                    className="group border-b last:border-0 border-gray-500 text-[14px] max-sm:text-[12px]">

                                    <td className="py-2 px-3 max-xs:px-1.5 text-left w-px whitespace-nowrap max-xs:text-[10px]">
                                        {t.transactionDate}
                                    </td>

                                    <td className="py-2 max-w-[140px] max-sm:max-w-[100px] flex">
                                        <CategoryLabel category={t.category} size={25}/>
                                    </td>

                                    <td className="py-2 max-w-[150px] max-sm:max-w-[90px]">
                                        <Tooltip text={t.description}>
                                            <span className="flex truncate items-center">{t.description}</span>
                                        </Tooltip>
                                    </td>

                                    <td className={`py-1.5 px-2 text-right ${
                                        !t.category ? "text-gray-500" : t.category.type === "EXPENSE" ? "text-red-600" : "text-green-700"
                                    }`}>
                                        <span className="bg-white p-0.5">
                                            {t.category ? (t.category.type === "EXPENSE" ? "-" : "+") : ""}{formatCurrency(t.amount, currency.symbol)}
                                        </span>
                                    </td>

                                    <td className="pr-2 w-[52px]">
                                        <div className="flex gap-1 xl:opacity-0 group-hover:opacity-100">
                                            <button onClick={() => onEdit(t)}>
                                                <WordpadXP size={20} draggable={false}/>
                                            </button>
                                            <button onClick={() => onDelete(t.id)}>
                                                <WindowsRecycleBin2 size={20} draggable={false}/>
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