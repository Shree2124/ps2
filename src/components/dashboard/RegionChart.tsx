/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { ChartSkeleton } from "@/components/ui/loading-skeleton"
import type { RegionData } from "@/store/slices/dashboardSlice"

interface RegionChartProps {
  data: RegionData[]
  loading: boolean
}

const COLORS = [
  "#3b82f6", // blue
  "#10b981", // emerald
  "#8b5cf6", // violet
  "#f59e0b", // amber
  "#ef4444", // red
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-background shadow-lg p-3 border rounded-lg">
        <p className="font-semibold text-foreground">{data.region}</p>
        <p className="font-medium text-muted-foreground text-sm">Sales: {data.sales}%</p>
      </div>
    )
  }
  return null
}

export const RegionChart: React.FC<RegionChartProps> = ({ data, loading }) => {
  if (loading) {
    return <ChartSkeleton />
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-transparent text-xl">
            Sales by Region
          </CardTitle>
          <CardDescription className="font-medium text-muted-foreground text-sm">
            Geographic distribution of sales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="sales"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 pl-6">
              <div className="space-y-3">
                {data.map((item, index) => (
                  <motion.div
                    key={item.region}
                    className="flex justify-between items-center"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div className="flex items-center">
                      <div
                        className="mr-3 rounded-full w-3 h-3"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="font-semibold text-foreground text-sm">{item.region}</span>
                    </div>
                    <span className="font-bold text-muted-foreground text-sm">{item.percentage}%</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
