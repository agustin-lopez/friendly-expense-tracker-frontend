import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#eb8f8f", "#ebbe8f", "#ede9a8", "#b2e394", "#b3fce5",
                        "#8dbac4", "#9fb6ed", "#9a9ae6", "#baace3", "#9079ab",
                        "#debae3", "#f5b0dd", "#ed5c88", "#768c77", "#9bb06d"];

export default function ExpensesByCategoryChart({ transactions }) {
    const expensesByCategory = {};

    transactions
        .filter((t) => t.category.type === "EXPENSE")
        .forEach((t) => {
            const categoryName = t.category.name;
            expensesByCategory[categoryName] =
                (expensesByCategory[categoryName] || 0) + parseFloat(t.amount);
        });

    const chartData = Object.entries(expensesByCategory).map(([name, value]) => ({
        name,
        value,
    }));

    const total = chartData.reduce((sum, entry) => sum + entry.value, 0);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={(entry) => {
                        const percentage = ((entry.value / total) * 100).toFixed(1);
                        return `${percentage}% ($${entry.value.toFixed(2)})`;
                    }}
                >
                    {chartData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}