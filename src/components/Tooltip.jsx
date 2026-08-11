import { useState, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

export default function Tooltip({ text, children }) {
    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState({ top: -9999, left: -9999 });
    const triggerRef = useRef(null);
    const tooltipRef = useRef(null);

    useLayoutEffect(() => {
        if (!isVisible || !triggerRef.current || !tooltipRef.current) return;

        const margin = 8;
        const gap = 8;
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        left = Math.max(margin, Math.min(left, viewportWidth - tooltipRect.width - margin));

        let top = triggerRect.top - tooltipRect.height - gap;
        if (top < margin) {
            top = triggerRect.bottom + gap;
        }
        top = Math.max(margin, Math.min(top, viewportHeight - tooltipRect.height - margin));

        setCoords({ top, left });
    }, [isVisible, text]);

    return (
        <div>
            <div
                ref={triggerRef}
                className="flex items-center max-w-full"
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
            >
                {children}
            </div>

            {isVisible &&
                createPortal(
                    <div
                        ref={tooltipRef}
                        className="fixed z-50 flex"
                        style={{ top: coords.top, left: coords.left }}
                    >
                        <div className="custom-bg-2 text-sm rounded-[2px] p-3 whitespace-normal break-words border-1 border-r-3 border-b-3 border-gray-500 w-max max-w-64">
                            {text}
                        </div>
                    </div>,
                    document.body
                )}
        </div>
    );
}


