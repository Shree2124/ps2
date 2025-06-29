/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { ChartSkeleton } from "@/components/ui/loading-skeleton"
import type { ProductData } from "@/store/slices/dashboardSlice"

interface ProductChartProps {
  data: ProductData[]
  loading: boolean
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background shadow-lg p-3 border rounded-lg">
        <p className="mb-2 font-semibold text-foreground">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="font-medium text-sm" style={{ color: entry.color }}>
            {`${entry.dataKey === "sales" ? "Sales" : "Revenue"}: ${
              entry.dataKey === "revenue" ? `$${entry.value.toLocaleString()}` : entry.value.toLocaleString()
            }`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export const ProductChart: React.FC<ProductChartProps> = ({ data, loading }) => {
  if (loading) {
    return <ChartSkeleton />
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 font-bold text-transparent text-xl">
            Product Performance
          </CardTitle>
          <CardDescription className="font-medium text-muted-foreground text-sm">
            Sales and revenue by product category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                dataKey="name"
                className="font-medium text-xs"
                tick={{ fontSize: 11, fontWeight: 500 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis yAxisId="left" className="font-medium text-xs" tick={{ fontSize: 12, fontWeight: 500 }} />
              <YAxis
                yAxisId="right"
                orientation="right"
                className="font-medium text-xs"
                tick={{ fontSize: 12, fontWeight: 500 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: "14px", fontWeight: "500" }} />
              <Bar yAxisId="left" dataKey="sales" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} name="Sales" />
              <Bar
                yAxisId="right"
                dataKey="revenue"
                fill="hsl(var(--chart-4))"
                radius={[4, 4, 0, 0]}
                opacity={0.8}
                name="Revenue"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}
