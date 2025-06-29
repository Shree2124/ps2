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
import { Package, Truck, CheckCircle, Clock, Search, Filter } from "lucide-react"

const ordersData = [
  {
    id: "#ORD-001",
    customer: "John Doe",
    product: "Premium Package",
    amount: 299,
    status: "delivered",
    date: "2024-01-15",
  },
  {
    id: "#ORD-002",
    customer: "Jane Smith",
    product: "Standard Package",
    amount: 199,
    status: "shipped",
    date: "2024-01-14",
  },
  {
    id: "#ORD-003",
    customer: "Mike Johnson",
    product: "Basic Package",
    amount: 99,
    status: "processing",
    date: "2024-01-13",
  },
  {
    id: "#ORD-004",
    customer: "Sarah Wilson",
    product: "Enterprise",
    amount: 599,
    status: "delivered",
    date: "2024-01-12",
  },
  {
    id: "#ORD-005",
    customer: "Tom Brown",
    product: "Premium Package",
    amount: 299,
    status: "pending",
    date: "2024-01-11",
  },
  {
    id: "#ORD-006",
    customer: "Lisa Davis",
    product: "Standard Package",
    amount: 199,
    status: "shipped",
    date: "2024-01-10",
  },
  {
    id: "#ORD-007",
    customer: "Chris Lee",
    product: "Basic Package",
    amount: 99,
    status: "delivered",
    date: "2024-01-09",
  },
  {
    id: "#ORD-008",
    customer: "Amy Taylor",
    product: "Enterprise",
    amount: 599,
    status: "processing",
    date: "2024-01-08",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "default"
    case "shipped":
      return "secondary"
    case "processing":
      return "outline"
    case "pending":
      return "destructive"
    default:
      return "secondary"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "delivered":
      return CheckCircle
    case "shipped":
      return Truck
    case "processing":
      return Package
    case "pending":
      return Clock
    default:
      return Package
  }
}

export default function OrdersPage() {
  const { user, userLoading } = useDashboard()

  return (
    <div className="bg-background min-h-screen">
      <ResponsiveSidebar />
      <div className="md:pl-64 lg:pl-72">
        <ResponsiveHeader
          user={user}
          userLoading={userLoading}
          currentPath="/orders"
          title="Orders"
          subtitle="Manage and track all your orders"
        />
        <main className="p-4 sm:p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 sm:space-y-6">
            {/* Order Stats */}
            <div className="gap-3 sm:gap-4 md:gap-6 grid grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Total Orders", value: "1,247", change: "+12%", icon: Package, color: "blue" },
                { title: "Pending", value: "23", change: "-5%", icon: Clock, color: "orange" },
                { title: "Shipped", value: "156", change: "+8%", icon: Truck, color: "purple" },
                { title: "Delivered", value: "1,068", change: "+15%", icon: CheckCircle, color: "green" },
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

            {/* Search and Filter */}
            <div className="flex sm:flex-row flex-col gap-3 sm:gap-4">
              <div className="relative flex-1">
                <Search className="top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2 transform" />
                <Input placeholder="Search orders..." className="pl-10" />
              </div>
              <Button variant="outline" className="flex-shrink-0 bg-transparent">
                <Filter className="mr-2 w-4 h-4" />
                Filter
              </Button>
            </div>

            {/* Orders Table */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>A list of your recent orders and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead className="hidden sm:table-cell">Product</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="hidden md:table-cell">Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {ordersData.map((order, index) => {
                          const StatusIcon = getStatusIcon(order.status)
                          return (
                            <motion.tr
                              key={order.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * index }}
                              className="hover:bg-muted/50 transition-colors"
                            >
                              <TableCell className="font-medium">{order.id}</TableCell>
                              <TableCell>{order.customer}</TableCell>
                              <TableCell className="hidden sm:table-cell">{order.product}</TableCell>
                              <TableCell className="text-right">${order.amount}</TableCell>
                              <TableCell>
                                <Badge variant={getStatusColor(order.status)} className="flex items-center w-fit">
                                  <StatusIcon className="mr-1 w-3 h-3" />
                                  {order.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">{order.date}</TableCell>
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
