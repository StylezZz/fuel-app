"use client";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { TrendingUp } from "lucide-react";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function Home() {
  return (
      <main className="container mx-auto p-4 lg:p-8 h-max">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg md:text-xl">Consumo Total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl md:text-4xl font-bold">2.130 L</p>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg md:text-xl">Promedio Mensual</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl md:text-4xl font-bold">365 L</p>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg md:text-xl">Eficiencia</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl md:text-4xl font-bold">12.5 km/L</p>
            </CardContent>
          </Card>
        </div>
        <Card className="mb-6 md:mb-8">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg md:text-xl">Consumo Mensual</CardTitle>
          </CardHeader>
          <CardContent className="px-2 md:px-6">
              <ChartContainer config={chartConfig} className="h-[400px] w-[1400px]">
                <BarChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    top: 20,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
                    <LabelList
                      position="top"
                      offset={12}
                      className="fill-foreground"
                      fontSize={12}
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm px-6 py-4">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
      </main>
  );
}


