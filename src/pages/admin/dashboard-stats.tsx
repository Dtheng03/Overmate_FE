import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useMemo } from "react";
import axiosClient from "@/config";
import { Label, Pie, PieChart } from "recharts"
import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Services, Stats, Up, Users } from "@/components/icons/dashboard";

const chartConfig = {
    totalPrice: {
        label: "Doanh thu"
    }
} satisfies ChartConfig

function DashboardStats() {
    // call data
    const { data } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: () => axiosClient.get("/dashboard"),
    });

    const chartData = [
        { type: "Dọn dẹp nhà", number: data?.data?.value?.numberServicesOfMovation, fill: "#4BC8E7" },
        { type: "Bảo trì thiết bị", number: data?.data?.value?.numberServicesOfRepairation, fill: "#1C1E4E" },
    ]

    const totalServices = useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.number, 0)
    }, [])

    return (
        <section className="min-h-screen p-[4%] bg-color1">
            <div className="basis-[30%] p-0.5 rounded-lg bg-gradient-to-r from-[#011949] to-[#55A6CE]">
                <h2 className="py-2 rounded-lg bg-color1 text-color4 text-center text-xl font-bold">
                    Thông số
                </h2>
            </div>
            <div className="mt-4 flex gap-x-4">
                <div className="basis-1/4 p-[2%] bg-white rounded-lg">
                    <h3 className="text-color1 text-lg font-bold text-center">Người dùng</h3>
                    <div className="mt-2 flex justify-between text-color1">
                        <div className="flex items-center gap-x-[4px] text-lg font-bold">
                            {data?.data?.value?.numberUsersUntilToday - 1} người
                            <Up fill="white" height={16} width={16} />
                        </div>
                        <div className="w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-color1">
                            <Users fill="white" height={20} width={20} />
                        </div>
                    </div>
                    <p className="text-xs text-color1 font-light">Tăng <span className="font-bold">{data?.data?.value?.numberUsersUntilToday - data?.data?.value?.numberUsersPreviousDay}</span> so với hôm qua </p>
                </div>
                <div className="basis-1/4 p-[2%] bg-white rounded-lg">
                    <h3 className="text-color1 text-lg font-bold text-center">Doanh thu ngày</h3>
                    <div className="mt-2 flex justify-between text-color1">
                        <div className="flex items-center gap-x-[4px] text-lg font-bold">
                            {data?.data?.value?.revenuePerDay?.toLocaleString()} đ
                            <Up fill="white" height={16} width={16} />
                        </div>
                        <div className="w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-color1">
                            <Stats fill="white" height={20} width={20} />
                        </div>
                    </div>
                </div>
                <div className="basis-1/4 p-[2%] bg-white rounded-lg">
                    <h3 className="text-color1 text-lg font-bold text-center">Dọn dẹp nhà</h3>
                    <div className="mt-2 flex justify-between text-color1">
                        <div className="flex items-center gap-x-[4px] text-lg font-bold">
                            {data?.data?.value?.numberServicesOfMovation} dịch vụ
                            <Up fill="white" height={16} width={16} />
                        </div>
                        <div className="w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-color1">
                            <Services fill="white" height={20} width={20} />
                        </div>
                    </div>
                </div>
                <div className="basis-1/4 p-[2%] bg-white rounded-lg">
                    <h3 className="text-color1 text-lg font-bold text-center">Bảo trì thiết bị</h3>
                    <div className="mt-2 flex justify-between text-color1">
                        <div className="flex items-center gap-x-[4px] text-lg font-bold">
                            {data?.data?.value?.numberServicesOfRepairation} dịch vụ
                            <Up fill="white" height={16} width={16} />
                        </div>
                        <div className="w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-color1">
                            <Services fill="white" height={20} width={20} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12 basis-[30%] p-0.5 rounded-lg bg-gradient-to-r from-[#011949] to-[#55A6CE]">
                <h2 className="py-2 rounded-lg bg-color1 text-color4 text-center text-xl font-bold">
                    Biểu đồ
                </h2>
            </div>
            <div className="mt-4 flex gap-x-4">
                <Card className="basis-1/2 bg-white rounded-lg">
                    <CardHeader>
                        <CardTitle>Doanh thu</CardTitle>
                        <CardDescription>Năm 2024 - Theo quý</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} >
                            <BarChart accessibilityLayer data={data?.data?.value?.revenues}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="quarter"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => `Quý ${value}`}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Bar dataKey="totalPrice" fill="#4BC8E7" radius={8} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="flex flex-col basis-1/2 bg-white rounded-lg">
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Dịch vụ</CardTitle>
                        <CardDescription>Dịch vụ trong toàn hệ thống</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer
                            config={chartConfig}
                            className="mx-auto my-8 aspect-square max-h-[250px]"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={chartData}
                                    dataKey="number"
                                    nameKey="type"
                                    innerRadius={60}
                                    strokeWidth={5}
                                >
                                    <Label
                                        content={({ viewBox }) => {
                                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                return (
                                                    <text
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        textAnchor="middle"
                                                        dominantBaseline="middle"
                                                    >
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            className="fill-foreground text-3xl font-bold"
                                                        >
                                                            {totalServices.toLocaleString()}
                                                        </tspan>
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={(viewBox.cy || 0) + 24}
                                                            className="fill-muted-foreground"
                                                        >
                                                            Dịch vụ
                                                        </tspan>
                                                    </text>
                                                )
                                            }
                                        }}
                                    />
                                </Pie>
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}

export default DashboardStats;