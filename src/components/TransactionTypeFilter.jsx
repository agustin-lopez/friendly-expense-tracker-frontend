import { useState, useRef, useEffect } from "react";

const OPTIONS = [
    { value: "ALL", label: "All" },
    { value: "EXPENSE", label: "Expenses" },
    { value: "INCOME", label: "Income" },
];

export default function TransactionTypeFilter({ value, onChange }) {
    const buttonRefs = useRef({});
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, height: 0, top: 0 });

    useEffect(() => {
        const activeButton = buttonRefs.current[value];
        if (activeButton) {
            setIndicatorStyle({
                left: activeButton.offsetLeft,
                width: activeButton.offsetWidth,
                top: activeButton.offsetTop,
                height: activeButton.offsetHeight,
            });
        }
    }, [value]);

    return (
        <div className="relative w-[100%] rounded-t-[3px] flex items-center justify-left custom-bg-2 border-t-3 border-gray-300">
            <span
                className="absolute button-pressed"
                style={{
                    left: indicatorStyle.left,
                    width: indicatorStyle.width,
                    top: indicatorStyle.top,
                    height: indicatorStyle.height,
                }}
            />
            {OPTIONS.map((option, index) => (
                <div key={option.value} className="flex items-center">
                    {index > 0 && (
                        <span className="w-px h-5 bg-gray-400 shadow-[1px_0_0_rgba(255,255,255,0.8)]" />
                    )}
                    <button
                        ref={(el) => (buttonRefs.current[option.value] = el)}
                        onClick={() => onChange(option.value)}
                        className={`relative z-10 text-sm font-medium text-center whitespace-nowrap transition-colors font-semibold px-4 py-1 ${
                            value === option.value
                                ? "text-gray-900"
                                : "text-gray-600 hover:text-gray-800"
                        }`}
                    >
                        {option.label}
                    </button>
                </div>
            ))}
        </div>
    );
}