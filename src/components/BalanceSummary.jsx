export default function BalanceSummary({ transactions }) {
    const totals = transactions.reduce(
        (acc, t) => {
            const amount = parseFloat(t.amount);
            if (t.category.type === "INCOME") {
                acc.income += amount;
            } else {
                acc.expenses += amount;
            }
            return acc;
        },
        { income: 0, expenses: 0 }
    );

    const balance = totals.income - totals.expenses;

    return (
        //<div className="relative flex justify-center gap-6 mb-4  rounded-t-[3px] p-2">
        <div className="w-[100%] grid grid-cols-3 gap-4 px-2 py-3 top-bar">
            <div className="text-center">
                <p className="text-sm font-bold text-gray-500">Income</p>
                <p className="text-xl font-bold text-green-600">
                    +${totals.income.toFixed(2)}
                </p>
            </div>
            <div className="text-center">
                <p className="text-sm font-bold text-gray-500">Expenses</p>
                <p className="text-xl font-bold text-red-600">
                    -${totals.expenses.toFixed(2)}
                </p>
            </div>
            <div className="text-center">
                <p className="text-sm font-bold text-gray-500">Total balance</p>
                <p className={`text-xl font-bold ${balance >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {balance >= 0 ? "" : "-"} ${Math.abs(balance).toFixed(2)}
                </p>
            </div>
        </div>
    );
}