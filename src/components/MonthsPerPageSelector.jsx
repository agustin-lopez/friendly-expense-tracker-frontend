const OPTIONS = [1, 2, 3, 6, 12];

export default function MonthsPerPageSelector({ value, onChange }) {
    return (
        <div className="flex items-center gap-2 text-sm">
            <select
                id="months-per-page-select"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="border text-xs rounded-[2px] py-0.5 px-1"
            >
                {OPTIONS.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <label htmlFor="months-per-page-select" className="text-gray-600 max-xs:hidden">Months per page</label>
        </div>
    );
}