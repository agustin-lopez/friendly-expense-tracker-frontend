export default function Tooltip({ text, children }) {
    return (
        <div className="relative group/tooltip inline-block max-w-full">
            {children}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:block z-20">
                <div className="bg-white text-[14px] rounded-[3px] p-3 whitespace-normal w-40 shadow-lg border-t-6 border-[#124DFF] shadow">
                    {text}
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#E7E7E7]" />
            </div>
        </div>
    );
}