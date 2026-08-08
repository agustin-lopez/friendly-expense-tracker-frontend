import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AppearanceProvider } from "./context/AppearanceContext.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <AppearanceProvider>
                <App />
            </AppearanceProvider>
        </AuthProvider>
    </StrictMode>
);