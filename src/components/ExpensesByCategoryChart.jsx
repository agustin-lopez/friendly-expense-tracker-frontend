import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import FaceOverlay from "./FaceOverlay";
import { formatCurrency } from "../utils/formatCurrency";

const COLORS = ["#ec6464", "#925df1", "#71bb99", "#79af57",
                        "#2d725c", "#8dbac4", "#d9f658", "#9a9ae6",
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
                                return `${percentage}% ($${formatCurrency(entry.value)})`;
                            }}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={index} fill={entry.color}/>
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => `$${formatCurrency(value)}`}
                                 contentStyle={{
                                     backgroundColor: "#edead6",
                                     border: "1px solid #6a7282"
                                 }}
                        />
                    </PieChart>
                </ResponsiveContainer>
                <FaceOverlay/>
            </div>

            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
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