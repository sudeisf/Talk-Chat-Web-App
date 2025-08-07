"use client"

import { MessageSquare, TrendingUp } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const sessionData = [
  { month: "January", sessions: 120 },
  { month: "February", sessions: 190 },
  { month: "March", sessions: 150 },
  { month: "April", sessions: 230 },
  { month: "May", sessions: 210 },
  { month: "June", sessions: 200 },
]

const chartConfig = {
  sessions: {
    label: "Sessions",
    color: "#f97316", 
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig

export function TotalSessionsChart() {
  return (
    <Card className="w-[60%] max-w-2xl *:font-sans border-0 shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-rubik font-semibold">
          <MessageSquare className="h-5 w-5 text-orange-500" />
          Total Sessions
        </CardTitle> 
        <CardDescription>January – June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={sessionData}
            layout="vertical"
            margin={{ right: 16 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="sessions" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="sessions" fill="var(--color-sessions)" radius={4}>
              <LabelList
                dataKey="month"
                position="insideLeft"
                offset={8}
                className="fill-white"
                fontSize={12}
              />
              <LabelList
                dataKey="sessions"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 8.6% this month
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="text-muted-foreground leading-none">
          Based on total chat sessions over the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
