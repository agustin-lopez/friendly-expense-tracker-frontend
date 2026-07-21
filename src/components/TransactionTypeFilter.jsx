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
        <div className="relative flex gap-6 border-b border-gray-200 mb-4 place-self-center">
            {OPTIONS.map((option) => (
                <button
                    key={option.value}
                    ref={(el) => (buttonRefs.current[option.value] = el)}
                    onClick={() => onChange(option.value)}
                    className={`pb-2 text-sm font-medium transition-colors w-17 ${
                        value === option.value
                            ? "text-gray-900"
                            : "text-gray-400 hover:text-gray-600"
                    }`}
                >
                    {option.label}
                </button>
            ))}
            <span
                className="absolute bottom-0 h-0.5 bg-blue-600 transition-all duration-300 ease-out"
                style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
            />
        </div>
    );
}