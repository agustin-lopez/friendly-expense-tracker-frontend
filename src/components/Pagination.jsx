export default function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-4 mt-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="px-3 py-1 border rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
            >
                ←
            </button>
            <span className="text-sm">
                Page {currentPage + 1} of {totalPages}
            </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
                className="px-3 py-1 border rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
            >
                →
            </button>
        </div>
    );
}