import defaultBackground from "../assets/backgrounds/background.jpg";
import xpBackground from "../assets/backgrounds/background-xp.jpg"
import vaporwaveBackground from "../assets/backgrounds/background-vaporwave.jpg";

export const BACKGROUND_PRESETS = [
    { id: "default-background", type: "image", value: defaultBackground, label: "Default" },
    { id: " xp-background", type: "image", value: xpBackground, label: "XP" },
    { id: " vaporwave-background", type: "image", value: vaporwaveBackground, label: "Vaporwave" },

    { id: "sunset", type: "gradient", value: "radial-gradient(circle,rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%)", label: "Gradient 1" },
    { id: "ocean", type: "gradient", value: "linear-gradient(90deg, #6286e1 0%, #9fbbf6 65%, #9fbbf6 70%, #6286e1 100%)", label: "Gradient 2" },
    { id: "retro-xp", type: "gradient", value: "linear-gradient(90deg, #7362e1 0%, #9a90f5 65%, #9b91ef 70%, #7362e1 100%)", label: "Gradient 3" },
];