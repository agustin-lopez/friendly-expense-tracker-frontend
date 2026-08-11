export function formatCurrency(amount, currencySymbol = "$") {
    const formatted = new Intl.NumberFormat("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
    return `${currencySymbol}${formatted}`;
}