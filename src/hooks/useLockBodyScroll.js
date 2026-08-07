import { useEffect } from "react";

export function useLockBodyScroll(isLocked) {
    useEffect(() => {
        if (!isLocked) return;

        const originalOverflowY = document.documentElement.style.overflowY;
        document.documentElement.style.overflowY = "hidden";

        return () => {
            document.documentElement.style.overflowY = originalOverflowY;
        };
    }, [isLocked]);
}