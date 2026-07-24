import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import FaceOverlay from "./FaceOverlay";

const COLORS = ["#ec6464", "#925df1", "#84d9b5", "#79af57",
                        "#b3fce5", "#8dbac4", "#eff8be", "#9a9ae6",
                        "#baace3", "#9079ab", "#9aa8ad", "#f5b0dd",
                        "#ed5c88", "#768c77", "#d9f1ab", "#5b7bf3"];

export default function ExpensesByCategoryChart({ categoryTotals }) {
    const chartData = categoryTotals.map((c, index) => ({
        name: c.categoryName,
        value: parseFloat(c.total),
        color: COLORS[index % COLORS.length],
    }));

    const total = chartData.reduce((sum, entry) => sum + entry.value, 0);

    return (
        <div>
            <div className="relative">
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
                            {chartData.map((entry, index) => (
                                <Cell key={index} fill={entry.color}/>
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => `$${value.toFixed(2)}`}/>
                    </PieChart>
                </ResponsiveContainer>
                <FaceOverlay/>
            </div>

            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2">
                {chartData.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-1.5 text-sm">
                        <span className="w-3 h-3 rounded-sm" style={{backgroundColor: entry.color}}/>
                        {entry.name}
                    </div>
                ))}
            </div>
        </div>
    );
}