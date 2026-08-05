export default function Pagination({ currentPage, totalPages, onPageChange }) {

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-2">
            {currentPage > 0 ? (
                <div className="white-button-wrap">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 0}
                        className="white-button disabled:opacity-0"
                    >
                        ◀ Prev
                    </button>
                </div>
            ) : (
                <div className="w-[30px]"/>
            )}
            <span className="text-sm text-gray-600">
                Page {currentPage + 1} of {totalPages}
            </span>
            {currentPage < totalPages -1 ? (
                <div className="white-button-wrap">
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages - 1}
                        className="white-button disabled:opacity-0"
                    >
                        Next ▶
                    </button>
                </div>
            ) : (
                <div className="w-[30px]"/>
            )}

        </div>
    );
}