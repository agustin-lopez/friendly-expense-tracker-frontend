import TransactionRow from "./TransactionRow";

export default function SearchResults({ results, onEdit, onDelete, query }) {

    return (
        <div className="space-y-4 px-4 max-xs:px-2">
            <div className="transaction-month-card border-[1px] border-gray-500">
                <div className="px-3 py-2 transaction-month-bar border-b-2 border-gray-500 font-semibold text-[#153CB2]">
                    <h3>Results for "{query}"</h3>
                </div>

                <table className="w-full">
                    <tbody>
                    {results.length === 0 ? (
                        <tr className="flex place-content-center">
                            <td className="text-gray-800 text-sm py-4"> Nothing found :( </td>
                        </tr>
                    ) : (
                        results.map((t) => (
                                <TransactionRow key={t.id} transaction={t} onEdit={onEdit} onDelete={onDelete}/>
                            ))
                    )}

                    </tbody>
                </table>
            </div>
        </div>
    );
}