import { useState, useEffect } from "react";

export function useIsResizing(delay = 300) {
    const [isResizing, setIsResizing] = useState(false);

    useEffect(() => {
        let timeoutId;

        function handleResize() {
            setIsResizing(true);
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setIsResizing(false);
            }, delay);
        }

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(timeoutId);
        };
    }, [delay]);

    return isResizing;
}