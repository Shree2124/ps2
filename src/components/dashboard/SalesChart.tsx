/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { ChartSkeleton } from "@/components/ui/loading-skeleton"
import type { SalesData } from "@/store/slices/dashboardSlice"

interface SalesChartProps {
  data: SalesData[]
  loading: boolean
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background shadow-lg p-3 border rounded-lg">
        <p className="font-semibold text-foreground">{`Month: ${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.dataKey === "revenue" ? "Revenue" : "Orders"}: ${
              entry.dataKey === "revenue" ? `$${entry.value.toLocaleString()}` : entry.value.toLocaleString()
            }`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export const SalesChart: React.FC<SalesChartProps> = ({ data, loading }) => {
  if (loading) {
    return <ChartSkeleton />
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-transparent text-xl">
            Sales Overview
          </CardTitle>
          <CardDescription className="font-medium text-muted-foreground text-sm">
            Monthly revenue and order trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" className="font-medium text-xs" tick={{ fontSize: 12, fontWeight: 500 }} />
              <YAxis yAxisId="left" className="font-medium text-xs" tick={{ fontSize: 12, fontWeight: 500 }} />
              <YAxis
                yAxisId="right"
                orientation="right"
                className="font-medium text-xs"
                tick={{ fontSize: 12, fontWeight: 500 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--chart-1))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="orders"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}
