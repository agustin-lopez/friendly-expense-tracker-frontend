export default function BalanceSummary({ summary }) {
    const { totalIncome, totalExpenses, balance } = summary;

    return (
        <div className="w-[100%] flex flex-row justify-center gap-4 px-2 py-3 custom-bg-2">
            <div className="text-center w-[30%]">
                <p className="text-sm font-bold text-gray-500">Income</p>
                <p className="text-xl font-bold text-green-600">
                    ${parseFloat(totalIncome).toFixed(2)}
                </p>
            </div>
            <span className="w-px h-12 bg-gray-400 shadow-[1px_0_0_rgba(255,255,255,0.8)]"/>
            <div className="text-center w-[30%]">
                <p className="text-sm font-bold text-gray-500">Expenses</p>
                <p className="text-xl font-bold text-red-600">
                    -${parseFloat(totalExpenses).toFixed(2)}
                </p>
            </div>
            <span className="w-px h-12 bg-gray-400 shadow-[1px_0_0_rgba(255,255,255,0.8)]"/>
            <div className="text-center w-[30%]">
                <p className="text-sm font-bold text-gray-500">Total balance</p>
                <p className={`text-xl font-bold ${balance >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {balance >= 0 ? "" : "-"} ${Math.abs(parseFloat(balance)).toFixed(2)}
                </p>
            </div>
        </div>
    );
}