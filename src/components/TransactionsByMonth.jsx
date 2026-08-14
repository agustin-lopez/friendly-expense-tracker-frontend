import Tooltip from "./Tooltip";
import {WindowsRecycleBin2, WordpadXP} from "react-old-icons";
import {formatCurrency} from "../utils/formatCurrency";
import CategoryLabel from "./CategoryLabel";
import { useCurrency } from "../context/CurrencyContext.jsx";
import TransactionRow from "./TransactionRow";

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
                                <TransactionRow key={t.id} transaction={t} onEdit={onEdit} onDelete={onDelete} />
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}