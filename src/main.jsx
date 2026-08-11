import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import {DisplayProvider} from "./context/DisplayContext.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <DisplayProvider>
                <App />
            </DisplayProvider>
        </AuthProvider>
    </StrictMode>
);