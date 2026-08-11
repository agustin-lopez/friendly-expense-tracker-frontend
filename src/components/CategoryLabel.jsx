import CategoryIcon from "./CategoryIcon";
import Tooltip from "./Tooltip";

export default function CategoryLabel({ category, size = 16 }) {
    if (!category) {
        return (
            <Tooltip text="Uncategorized">
                <div className="flex flex-row gap-2">
                    <CategoryIcon name="Windows31ProgmanIcon" size={size} />
                    <span className="flex items-center">Uncategorized</span>
                </div>
            </Tooltip>
        );
    }

    return (
        <Tooltip text={category.name}>
            <div className="flex flex-row gap-2 items-center">
                <CategoryIcon name={category.icon} size={size} />
                <span className="flex truncate items-center w-30 max-xs:hidden">{category.name}</span>
            </div>
        </Tooltip>
    );
}