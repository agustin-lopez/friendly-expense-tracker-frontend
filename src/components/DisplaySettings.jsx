import { useBackground } from "../context/BackgroundContext.jsx";
import { useCurrency } from "../context/CurrencyContext.jsx";
import { BACKGROUND_PRESETS } from "../constants/backgroundOptions.js";
import { CURRENCY_OPTIONS } from "../constants/currencyOptions";

export default function DisplaySettings() {
    const { background, setBackground, setCustomColor } = useBackground();
    const { currency, setCurrency } = useCurrency();

    return (
        <div className="m-6 flex flex-col gap-5">
            <div>
                <h3 className="text-sl font-semibold text-gray-700">Background</h3>
                <div className="custom-underline"></div>
            </div>

            <div className="flex flex-row place-content-between">
                <label htmlFor="custom-color-picker" className="block text-sm font-medium">Custom color</label>
                <input
                    id="custom-color-picker"
                    type="color"
                    value={background.type === "color" ? background.value : "#1e3a8a"}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="w-[50%] h-8 border rounded cursor-pointer"
                />
            </div>

            <div className="grid grid-cols-3 gap-2 w-full place-self-center">
                {BACKGROUND_PRESETS.map((option) => (
                    <button
                        key={option.id}
                        type="button"
                        onClick={() => setBackground(option)}
                        className={`h-20 max-sm:h-18 w-30 max-sm:w-24  max-xs:w-21 rounded border-2 ${
                            background.id === option.id ? "border-blue-500" : "border-gray-200"
                        }`}
                        title={option.label}
                        style={
                            option.type === "image"
                                ? {
                                    backgroundImage: `url(${option.value})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center"
                                }
                                : option.type === "gradient"
                                    ? {backgroundImage: option.value}
                                    : {backgroundColor: option.value}
                        }
                    />
                ))}
            </div>

            <div>
                <h3 className="text-sl font-semibold text-gray-700">Currency</h3>
                <div className="custom-underline"></div>
            </div>
            <select
                id="currency-select"
                value={currency.code}
                onChange={(e) => {
                    const selected = CURRENCY_OPTIONS.find((c) => c.code === e.target.value);
                    setCurrency(selected);
                }}
                className="w-[80%] border rounded px-3 py-2 text-sm"
            >
                {CURRENCY_OPTIONS.map((c) => (
                    <option key={c.code} value={c.code}>
                        {c.label}
                    </option>
                ))}
            </select>
        </div>
    );
}