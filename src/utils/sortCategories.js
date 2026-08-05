export function sortCategories(categories) {
    return [...categories].sort((a, b) => {
        if (a.type !== b.type) {
            return a.type === "EXPENSE" ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
    });
}