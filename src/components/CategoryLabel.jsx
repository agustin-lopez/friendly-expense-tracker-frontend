import CategoryIcon from "./CategoryIcon";
import Tooltip from "./Tooltip";

export default function CategoryLabel({ category, size = 16 }) {
    if (!category) {
        return (
            <Tooltip text="No category">
                <div className="flex flex-row h-full gap-3">
                    <CategoryIcon name="Windows31ProgmanIcon" size={size} />
                    <span className="flex items-center text-[14px]">No category</span>
                </div>
            </Tooltip>
        );
    }

    return (
        <Tooltip text={category.name}>
            <div className="flex flex-row h-full gap-3">
                <CategoryIcon name={category.icon} size={size} />
                <span className="flex truncate items-center text-[14px] w-30">{category.name}</span>
            </div>
        </Tooltip>
    );
}