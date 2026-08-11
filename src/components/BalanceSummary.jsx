import { formatCurrency } from "../utils/formatCurrency";
import { useAppearance } from "../context/AppearanceContext";

export default function BalanceSummary({ summary }) {
    const { totalIncome, totalExpenses, balance } = summary;
    const { currency } = useAppearance();

    return (
        <div className="w-[100%] flex flex-row justify-center gap-4 px-2 py-3 custom-bg-2">
            <div className="text-center w-[30%] max-md:w-[25%]">
                <p className="text-sm font-bold text-gray-500">Income</p>
                <p className="text-xl max-md:text-lg max-sm:text-base font-bold text-green-600">
                    {formatCurrency(totalIncome, currency.symbol)}
                </p>
            </div>
            <span className="w-px h-12 bg-gray-400 shadow-[1px_0_0_rgba(255,255,255,0.8)]"/>
            <div className="text-center w-[30%] max-md:w-[25%]">
                <p className="text-sm font-bold text-gray-500">Expenses</p>
                <p className="text-xl max-md:text-lg max-sm:text-base font-bold text-red-600">
                    {formatCurrency(totalExpenses, currency.symbol)}
                </p>
            </div>
            <span className="w-px h-12 bg-gray-400 shadow-[1px_0_0_rgba(255,255,255,0.8)]"/>
            <div className="text-center w-[30%] max-md:w-[25%]">
                <p className="text-sm font-bold text-gray-500">Balance</p>
                <p className={`text-xl max-md:text-lg max-sm:text-base font-bold ${balance >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {balance >= 0 ? "" : "-"}{formatCurrency(Math.abs(balance), currency.symbol)}
                </p>
            </div>
        </div>
    );
}