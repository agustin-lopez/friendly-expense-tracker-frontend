import * as OldIcons from "react-old-icons";

export default function CategoryIcon({ name, size = 16, className = "" }) {

    const IconComponent = OldIcons[name];

    if (!IconComponent) return null;

    return <IconComponent size={size} className={className} />;
}