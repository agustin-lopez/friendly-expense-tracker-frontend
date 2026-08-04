export default function Tooltip({ text, children }) {
    return (
        <div className="relative group/tooltip inline-block max-w-full content-center">
            {children}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:block z-20 w-max max-w-64">
                <div className="custom-bg-2 text-[14px] rounded-[2px] p-3 whitespace-normal break-words border-1 border-b-3 border-r-3 border-gray-500">
                    {text}
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-500" />
            </div>
        </div>
    );
}