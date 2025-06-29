"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"
import { TableSkeleton } from "@/components/ui/loading-skeleton"
import type { ProductData } from "@/store/slices/dashboardSlice"

interface ProductTableProps {
  data: ProductData[]
  loading: boolean
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value)
}

export const ProductTable: React.FC<ProductTableProps> = ({ data, loading }) => {
  if (loading) {
    return <TableSkeleton />
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-bold text-transparent text-xl">
            Top Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-b-2">
                <TableHead className="font-bold text-foreground text-sm uppercase tracking-wide">Product</TableHead>
                <TableHead className="font-bold text-foreground text-sm uppercase tracking-wide">Sales</TableHead>
                <TableHead className="font-bold text-foreground text-sm uppercase tracking-wide">Revenue</TableHead>
                <TableHead className="font-bold text-foreground text-sm uppercase tracking-wide">Growth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((product, index) => (
                <motion.tr
                  key={product.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="group hover:bg-muted/50 transition-colors duration-200"
                >
                  <TableCell className="font-bold text-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </TableCell>
                  <TableCell className="font-semibold text-muted-foreground">
                    {product.sales.toLocaleString()}
                  </TableCell>
                  <TableCell className="font-semibold text-muted-foreground">
                    {formatCurrency(product.revenue)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={product.growth > 0 ? "default" : "destructive"}
                      className="flex items-center px-3 py-1 w-fit font-bold text-xs"
                    >
                      {product.growth > 0 ? (
                        <TrendingUp className="mr-1 w-3 h-3" />
                      ) : (
                        <TrendingDown className="mr-1 w-3 h-3" />
                      )}
                      {product.growth > 0 ? "+" : ""}
                      {product.growth}%
                    </Badge>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
}
