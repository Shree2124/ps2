"use client"

import { motion } from "framer-motion"
import { useDashboard } from "@/hooks/useDashboard"
import { ResponsiveHeader } from "@/components/layouts/ResponsiveHeader"
import { ResponsiveSidebar } from "@/components/layouts/ResponsiveSidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Package, Plus, Search, Filter, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"

const productsData = [
  {
    id: "PRD-001",
    name: "Premium Package",
    category: "Software",
    price: 299,
    stock: 45,
    sold: 1250,
    revenue: 373750,
    status: "active",
    trend: "up",
    trendValue: 12.5,
  },
  {
    id: "PRD-002",
    name: "Standard Package",
    category: "Software",
    price: 199,
    stock: 78,
    sold: 2100,
    revenue: 417900,
    status: "active",
    trend: "up",
    trendValue: 8.3,
  },
  {
    id: "PRD-003",
    name: "Basic Package",
    category: "Software",
    price: 99,
    stock: 12,
    sold: 3200,
    revenue: 316800,
    status: "low_stock",
    trend: "down",
    trendValue: -2.1,
  },
  {
    id: "PRD-004",
    name: "Enterprise Solution",
    category: "Enterprise",
    price: 599,
    stock: 23,
    sold: 450,
    revenue: 269550,
    status: "active",
    trend: "up",
    trendValue: 25.7,
  },
  {
    id: "PRD-005",
    name: "Starter Kit",
    category: "Starter",
    price: 49,
    stock: 156,
    sold: 1800,
    revenue: 88200,
    status: "active",
    trend: "up",
    trendValue: 5.2,
  },
  {
    id: "PRD-006",
    name: "Professional Tools",
    category: "Tools",
    price: 399,
    stock: 0,
    sold: 890,
    revenue: 355110,
    status: "out_of_stock",
    trend: "up",
    trendValue: 15.8,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "default"
    case "low_stock":
      return "destructive"
    case "out_of_stock":
      return "secondary"
    default:
      return "secondary"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "active":
      return Package
    case "low_stock":
      return AlertTriangle
    case "out_of_stock":
      return AlertTriangle
    default:
      return Package
  }
}

export default function ProductsPage() {
  const { user, userLoading } = useDashboard()

  return (
    <div className="bg-background min-h-screen">
      <ResponsiveSidebar />
      <div className="md:pl-64 lg:pl-72">
        <ResponsiveHeader user={user} userLoading={userLoading} />
        <main className="p-4 sm:p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 sm:space-y-6">
            {/* Product Stats */}
            <div className="gap-3 sm:gap-4 md:gap-6 grid grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Total Products", value: "156", change: "+8%", icon: Package, color: "blue" },
                { title: "Active Products", value: "142", change: "+5%", icon: Package, color: "green" },
                { title: "Low Stock", value: "12", change: "+3", icon: AlertTriangle, color: "orange" },
                { title: "Out of Stock", value: "2", change: "-1", icon: AlertTriangle, color: "red" },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                      <CardTitle className="font-medium text-muted-foreground text-xs sm:text-sm">
                        {item.title}
                      </CardTitle>
                      <item.icon className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="font-bold text-lg sm:text-2xl">{item.value}</div>
                      <p className="font-medium text-green-600 text-xs">{item.change} from last month</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Search and Actions */}
            <div className="flex sm:flex-row flex-col gap-3 sm:gap-4">
              <div className="relative flex-1">
                <Search className="top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2 transform" />
                <Input placeholder="Search products..." className="pl-10" />
              </div>
              <Button className="flex-shrink-0">
                <Plus className="mr-2 w-4 h-4" />
                Add Product
              </Button>
              <Button variant="outline" className="flex-shrink-0 bg-transparent">
                <Filter className="mr-2 w-4 h-4" />
                Filter
              </Button>
            </div>

            {/* Products Table */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Product Catalog</CardTitle>
                  <CardDescription>Manage your product inventory and track performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead className="hidden sm:table-cell">Category</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                          <TableHead className="text-right">Stock</TableHead>
                          <TableHead className="hidden md:table-cell text-right">Sold</TableHead>
                          <TableHead className="hidden lg:table-cell text-right">Revenue</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="hidden xl:table-cell">Trend</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {productsData.map((product, index) => {
                          const StatusIcon = getStatusIcon(product.status)
                          return (
                            <motion.tr
                              key={product.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * index }}
                              className="hover:bg-muted/50 transition-colors"
                            >
                              <TableCell>
                                <div>
                                  <p className="font-medium text-sm">{product.name}</p>
                                  <p className="text-muted-foreground text-xs">{product.id}</p>
                                </div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">{product.category}</TableCell>
                              <TableCell className="text-right">${product.price}</TableCell>
                              <TableCell className="text-right">{product.stock}</TableCell>
                              <TableCell className="hidden md:table-cell text-right">
                                {product.sold.toLocaleString()}
                              </TableCell>
                              <TableCell className="hidden lg:table-cell text-right">
                                ${product.revenue.toLocaleString()}
                              </TableCell>
                              <TableCell>
                                <Badge variant={getStatusColor(product.status)} className="flex items-center w-fit">
                                  <StatusIcon className="mr-1 w-3 h-3" />
                                  {product.status.replace("_", " ")}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden xl:table-cell">
                                <div className="flex items-center">
                                  {product.trend === "up" ? (
                                    <TrendingUp className="mr-1 w-3 h-3 text-green-500" />
                                  ) : (
                                    <TrendingDown className="mr-1 w-3 h-3 text-red-500" />
                                  )}
                                  <span
                                    className={`text-xs font-medium ${
                                      product.trend === "up" ? "text-green-600" : "text-red-600"
                                    }`}
                                  >
                                    {product.trend === "up" ? "+" : ""}
                                    {product.trendValue}%
                                  </span>
                                </div>
                              </TableCell>
                            </motion.tr>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
