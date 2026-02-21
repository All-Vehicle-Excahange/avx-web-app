import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from "recharts";

const data = [
    { name: "Consult", value: 70 },
    { name: "Listing", value: 90 },
    { name: "Inspect", value: 65 },
    { name: "Activity", value: 95 },
    { name: "Engage", value: 80 },
];

export default function HeroGraph() {
    return (
        <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis
                        dataKey="name"
                        tick={{ fill: "#6b7280", fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip
                        cursor={{ fill: "rgba(96,165,250,0.08)" }}
                        wrapperStyle={{ outline: "none", background: "transparent" }}
                        contentStyle={{
                            background: "#0f1117",
                            border: "1px solid #1f2937",
                            borderRadius: "10px",
                            color: "#fff",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
                        }}
                        labelStyle={{ color: "#9ca3af" }}
                    />

                    <Bar
                        dataKey="value"
                        fill="url(#blueGradient)"
                        radius={[6, 6, 0, 0]}
                    />

                    <defs>
                        <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#60a5fa" />
                            <stop offset="100%" stopColor="#007bff" />
                        </linearGradient>
                    </defs>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}