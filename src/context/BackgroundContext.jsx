import { createContext, useContext, useState, useEffect, useRef } from "react";
import { BACKGROUND_PRESETS } from "../constants/backgroundOptions";

const BackgroundContext = createContext(null);

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

export function BackgroundProvider({ children }) {
    const [background, setBackgroundState] = useState(loadSavedBackground);
    const saveTimeout = useRef(null);
    const lastUpdate = useRef(0);

    useEffect(() => {
        const html = document.documentElement;
        if (background.type === "image") {
            html.style.backgroundImage = `url(${background.value})`;
            html.style.backgroundColor = "";
        } else {
            html.style.backgroundImage = background.type === "gradient" ? background.value : "none";
            html.style.backgroundColor = background.type === "color" ? background.value : "";
        }
    }, [background]);

    function setBackground(option) {
        setBackgroundState(option);
        clearTimeout(saveTimeout.current);
        saveTimeout.current = setTimeout(() => {
            localStorage.setItem("background", JSON.stringify(option));
        }, 300);
    }

    function setCustomColor(hexColor) {
        const now = Date.now();
        if (now - lastUpdate.current < 50) return;
        lastUpdate.current = now;
        setBackground({ id: "custom", type: "color", value: hexColor, label: "Custom" });
    }

    return (
        <BackgroundContext.Provider value={{ background, setBackground, setCustomColor }}>
            {children}
        </BackgroundContext.Provider>
    );
}

export function useBackground() {
    return useContext(BackgroundContext);
}