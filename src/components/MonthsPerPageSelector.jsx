const OPTIONS = [1, 2, 3, 6];

export default function MonthsPerPageSelector({ value, onChange }) {
    return (
        <div className="flex items-center gap-2 text-sm px-4">
            <select
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
            <span className="text-gray-600">Months per page</span>
        </div>
    );
}