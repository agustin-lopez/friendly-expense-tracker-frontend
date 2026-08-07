import {useState, useRef, useLayoutEffect} from "react";
import {createPortal} from "react-dom";

export default function Tooltip({text, children = true}) {
    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState({top: 0, left: 0});
    const triggerRef = useRef(null);

    useLayoutEffect(() => {
        if (isVisible && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setCoords({
                top: rect.top,
                left: rect.left + rect.width / 2,
            });
        }
    }, [isVisible]);

    return (
        <>
            <div
                ref={triggerRef}
                className="inline-block max-w-full"
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
            >
                {children}
            </div>
            {isVisible && createPortal(
                <div
                    className="fixed z-50 -translate-x-1/2 -translate-y-full -mt-2"
                    style={{ top: coords.top, left: coords.left }}
                >
                    <div className="custom-bg-2 text-[14px] rounded-[2px] p-3 whitespace-normal break-words border-1 border-r-3 border-b-3 border-gray-500 w-max max-w-64">
                        {text}
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-500"/>
                </div>,
                document.body
            )}

        </>
    );
}
