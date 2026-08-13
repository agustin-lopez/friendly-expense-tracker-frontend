import { createContext, useContext, useState } from "react";
import { CURRENCY_OPTIONS } from "../constants/currencyOptions";

const CurrencyContext = createContext(null);

function loadSavedCurrency() {
    const saved = localStorage.getItem("currency");
    const found = CURRENCY_OPTIONS.find((c) => c.code === saved);
    return found || CURRENCY_OPTIONS[0];
}

export function CurrencyProvider({ children }) {
    const [currency, setCurrencyState] = useState(loadSavedCurrency);

    function setCurrency(currencyOption) {
        setCurrencyState(currencyOption);
        localStorage.setItem("currency", currencyOption.code);
    }

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    return useContext(CurrencyContext);
}