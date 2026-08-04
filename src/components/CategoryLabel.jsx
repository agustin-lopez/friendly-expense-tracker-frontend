import CategoryIcon from "./CategoryIcon";
import Tooltip from "./Tooltip";

export default function CategoryLabel({ category, size = 16 }) {
    if (!category) {
        return (
            <div className="flex items-center gap-2 text-gray-400 italic py-2 w-px whitespace-nowrap">
                hola
                <Tooltip text="No category">
                <CategoryIcon name="Windows31ProgmanIcon" size={size} />
                    <span>No category</span>
                </Tooltip>
            </div>
        );
    }

    return (
        <Tooltip text={category.name}>
            <div className="flex flex-row h-full">
                <CategoryIcon name={category.icon} size={size} />
                <span className="flex truncate align-middle">{category.name}</span>
            </div>
        </Tooltip>
    );
}