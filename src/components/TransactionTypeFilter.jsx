import { useState, useRef, useEffect } from "react";

const OPTIONS = [
    { value: "ALL", label: "All" },
    { value: "EXPENSE", label: "Expenses" },
    { value: "INCOME", label: "Income" },
];

export default function TransactionTypeFilter({ value, onChange }) {
    const buttonRefs = useRef({});
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

    useEffect(() => {
        const activeButton = buttonRefs.current[value];
        if (activeButton) {
            setIndicatorStyle({
                left: activeButton.offsetLeft,
                width: activeButton.offsetWidth,
            });
        }
    }, [value]);

    return (
        <div className="relative w-[100%] rounded-t-[3px] flex justify-center gap-6 mb-4 top-bar p-2">
            {OPTIONS.map((option) => (
                <button
                    key={option.value}
                    ref={(el) => (buttonRefs.current[option.value] = el)}
                    onClick={() => onChange(option.value)}
                    className={`text-sm font-medium transition-colors w-17 font-semibold ${
                        value === option.value
                            ? "text-gray-900"
                            : "text-gray-600 hover:text-gray-800"
                    }`}
                >
                    {option.label}
                </button>
            ))}
            <span
                className="absolute bottom-0 h-1 bg-blue-600"
                style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
            />
        </div>
    );
}