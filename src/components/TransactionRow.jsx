import Tooltip from "./Tooltip";
import CategoryLabel from "./CategoryLabel";
import { formatCurrency } from "../utils/formatCurrency";
import { useCurrency } from "../context/CurrencyContext";
import {WindowsRecycleBin2, WordpadXP} from "react-old-icons";

export default function TransactionRow({ transaction, onEdit, onDelete }) {
    const { currency } = useCurrency();

    return (
        <tr key={transaction.id}
            className="group border-b last:border-0 border-gray-500 text-[14px] max-sm:text-[12px]">

            <td className="py-2 px-3 max-xs:px-1.5 text-left w-px whitespace-nowrap max-xs:text-[10px]">
                {transaction.transactionDate}
            </td>

            <td className="py-2 max-w-[140px] max-sm:max-w-[100px] flex">
                <CategoryLabel category={transaction.category} size={25}/>
            </td>

            <td className="py-2 max-w-[150px] max-sm:max-w-[90px]">
                <Tooltip text={transaction.description}>
                    <span className="flex truncate items-center">{transaction.description}</span>
                </Tooltip>
            </td>

            <td className={`py-1.5 px-2 text-right ${
                !transaction.category ? "text-gray-500" : transaction.category.type === "EXPENSE" ? "text-red-600" : "text-green-700"
            }`}>
                <span className="bg-white p-0.5">
                    {transaction.category ? (transaction.category.type === "EXPENSE" ? "-" : "+") : ""}{formatCurrency(transaction.amount, currency.symbol)}
                </span>
            </td>

            <td className="pr-2 w-[52px]">
                <div className="flex gap-1 xl:opacity-0 group-hover:opacity-100">
                    <button onClick={() => onEdit(transaction)}>
                        <WordpadXP size={20} draggable={false}/>
                    </button>
                    <button onClick={() => onDelete(transaction.id)}>
                        <WindowsRecycleBin2 size={20} draggable={false}/>
                    </button>
                </div>
            </td>
        </tr>
    );
}