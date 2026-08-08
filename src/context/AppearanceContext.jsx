import { createContext, useContext, useState, useEffect } from "react";
import { BACKGROUND_PRESETS } from "../constants/appearanceOptions";

const AppearanceContext = createContext(null);

function loadSavedBackground() {
    const saved = localStorage.getItem("background");
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch {
            return BACKGROUND_PRESETS[0];
        }
    }
    return BACKGROUND_PRESETS[0];
}

export function AppearanceProvider({ children }) {
    const [background, setBackgroundState] = useState(loadSavedBackground);

    useEffect(() => {
        const html = document.documentElement;

        if (background.type === "image") {
            html.style.backgroundImage = `url(${background.value})`;
            html.style.backgroundColor = "";
        } else if (background.type === "gradient") {
            html.style.backgroundImage = background.value;
            html.style.backgroundColor = "";
        } else {
            html.style.backgroundImage = "none";
            html.style.backgroundColor = background.value;
        }

        html.style.backgroundSize = "cover";
        html.style.backgroundPosition = "center";
        html.style.backgroundRepeat = "no-repeat";
        html.style.backgroundAttachment = "fixed";
    }, [background]);

    function setBackground(option) {
        setBackgroundState(option);
        localStorage.setItem("background", JSON.stringify(option));
    }

    function setCustomColor(hexColor) {
        const custom = { id: "custom", type: "color", value: hexColor, label: "Custom" };
        setBackground(custom);
    }

    const value = { background, setBackground, setCustomColor };

    return <AppearanceContext.Provider value={value}>{children}</AppearanceContext.Provider>;
}

export function useAppearance() {
    return useContext(AppearanceContext);
}