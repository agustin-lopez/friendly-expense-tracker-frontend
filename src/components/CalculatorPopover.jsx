import { useState } from "react";
import { evaluate } from "mathjs";
import DefaultButton from "./DefaultButton.jsx";
import {WindowsXPCalculator, WindowsXPExplorer} from "react-old-icons";

const BUTTONS = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "(", ")",
    "+",
];

export default function CalculatorPopover({ currentValue, onApply }) {
    const [isOpen, setIsOpen] = useState(false);
    const [expression, setExpression] = useState("");
    const [error, setError] = useState("");

    function handleToggle() {
        if (!isOpen) {
            setExpression(currentValue ? String(currentValue) : "");
            setError("");
        }
        setIsOpen(!isOpen);
    }

    function handleButtonClick(value) {
        setExpression((prev) => prev + value);
        setError("");
    }

    function handleClear() {
        setExpression("");
        setError("");
    }

    function handleBackspace() {
        setExpression((prev) => prev.slice(0, -1));
        setError("");
    }

    function handleEquals() {
        try {
            const result = evaluate(expression);
            if (typeof result !== "number" || !isFinite(result)) {
                throw new Error("Invalid result");
            }
            const rounded = Math.round(result * 100) / 100;
            onApply(rounded);
            setExpression(String(rounded));
        } catch (err) {
            setError("Invalid expression");
        }
    }

    return (
        <div className="relative inline-block">
            <DefaultButton onClickAction={handleToggle} className="h-full">
                {isOpen ? <WindowsXPExplorer size={16} /> : <WindowsXPCalculator size={16}/>}
            </DefaultButton>

            {isOpen && (
                <div className="flex flex-col gap-3 absolute left-full top-0 ml-2 z-30  custom-bg-2 border rounded-[2px] shadow-lg p-4 w-50">
                    <input
                        autoFocus
                        type="text"
                        value={expression}
                        onChange={(e) => { setExpression(e.target.value); setError(""); }}
                        className="w-full border rounded-[2px] bg-white px-2 py-0.5 text-right font-mono"
                    />

                    {/*{error && <p className="text-red-500 text-xs">{error}</p>}*/}

                    {/*BUTTONS*/}
                    <div className="grid grid-cols-4 gap-1">
                        {BUTTONS.map((btn) => (
                            <div key={btn} className="white-button-wrap w-full!">
                                <button
                                    type="button"
                                    onClick={() => handleButtonClick(btn)}
                                    className="white-button text-sm w-full"
                                >
                                    {btn}
                                </button>
                            </div>

                        ))}
                    </div>

                    <div className="flex flex-row place-content-between">
                        <DefaultButton onClickAction={handleBackspace} fontSize="10">
                            Backspace
                        </DefaultButton>
                        <DefaultButton onClickAction={handleClear}>
                            Clear
                        </DefaultButton>
                        <DefaultButton onClickAction={handleEquals}>
                            =
                        </DefaultButton>
                        {/*<button
                            type="button"
                            onClick={handleBackspace}
                            className="border rounded py-1.5 text-sm hover:bg-gray-100"
                        >
                            ⌫
                        </button>*/}
                        {/*<button
                            type="button"
                            onClick={handleEquals}
                            className="border rounded py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700"
                        >
                            =
                        </button>*/}
                    </div>
                </div>
            )}
        </div>
    );
}