import DefaultButton from "./DefaultButton.jsx";

export default function Pagination({ currentPage, totalPages, onPageChange }) {

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-2">
            {currentPage > 0 ? (
                <DefaultButton onClickAction={() => onPageChange(currentPage - 1)}>
                    ◀ Prev
                </DefaultButton>
            ) : (
                <div className="w-[60px]"/>
            )}
            <span className="text-sm text-gray-600">
                Page {currentPage + 1} of {totalPages}
            </span>
            {currentPage < totalPages -1 ? (
                <DefaultButton onClickAction={() => onPageChange(currentPage + 1)}>
                    Next ▶
                </DefaultButton>
            ) : (
                <div className="w-[60px]"/>
            )}

        </div>
    );
}