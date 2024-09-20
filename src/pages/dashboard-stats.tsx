import { Stats, Up, Users } from "@/components/icons/dashboard";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#2563eb",
    },
    mobile: {
        label: "Mobile",
        color: "#60a5fa",
    },
} satisfies ChartConfig

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]


function DashboardStats() {
    return (
        <section className="min-h-screen p-[4%] bg-color1">
            <h2 className="py-2 rounded-lg bg-color3 text-color4 text-center text-xl font-bold">
                Hôm nay <span className="text-white font-normal">(01/11/2024)</span>
            </h2>
            <div className="mt-4 flex gap-x-4">
                <div className="basis-1/4 p-[2%] bg-color2 rounded-lg">
                    <h3 className="text-color1 text-lg font-bold text-center">Người dùng</h3>
                    <div className="mt-2 flex justify-between text-white">
                        <div className="flex items-center gap-x-[4px] text-lg font-bold">
                            200
                            <Up fill="white" height={16} width={16} />
                        </div>
                        <div className="w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-color4">
                            <Users fill="white" height={20} width={20} />
                        </div>
                    </div>
                    <p className="text-xs text-white font-light">Tăng <span className="font-bold">30%</span> so với hôm qua </p>
                </div>
                <div className="basis-1/4 p-[2%] bg-color2 rounded-lg">
                    <h3 className="text-color1 text-lg font-bold text-center">Doanh thu</h3>
                    <div className="mt-2 flex justify-between text-white">
                        <div className="flex items-center gap-x-[4px] text-lg font-bold">
                            1086
                            <Up fill="white" height={16} width={16} />
                        </div>
                        <div className="w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-color4">
                            <Stats fill="white" height={20} width={20} />
                        </div>
                    </div>
                    <p className="text-xs text-white font-light">Tăng <span className="font-bold">49.9%</span> so với hôm qua </p>
                </div>
                <div className="basis-1/2 p-[2%] bg-color2 rounded-lg">
                    <h3 className="text-color1 text-lg font-bold text-center">Doanh thu</h3>
                    <div className="mt-2 flex gap-x-4 text-white">
                        <div className="basis-1/3 p-1 bg-color1 rounded-lg">
                            <h4 className="text-center">Gói kết nối</h4>
                            <p className="text-center">5</p>
                        </div>
                        <div className="basis-1/3 p-1 bg-color1 rounded-lg">
                            <h4 className="text-center">Gói bạn bè </h4>
                            <p className="text-center">3</p>
                        </div>
                        <div className="basis-1/3 p-1 bg-color1 rounded-lg">
                            <h4 className="text-center">Gói tri kỉ</h4>
                            <p className="text-center">1</p>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="mt-12 py-2 rounded-lg bg-color3 text-color4 text-center text-xl font-bold">
                Quý 4 <span className="text-white font-normal">(2024)</span>
            </h2>
            <div className="mt-4 flex">
                <ChartContainer config={chartConfig} className="basis-1/2 min-h-[200px] bg-white rounded-lg">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </div>
        </section>
    );
}

export default DashboardStats;