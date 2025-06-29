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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, UserPlus, Mail, Phone, Search, Filter, Star } from "lucide-react"

const customersData = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    company: "Tech Corp",
    status: "active",
    totalOrders: 12,
    totalSpent: 2450,
    lastOrder: "2024-01-15",
    rating: 5,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 234-5678",
    company: "Design Studio",
    status: "active",
    totalOrders: 8,
    totalSpent: 1890,
    lastOrder: "2024-01-12",
    rating: 4,
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1 (555) 345-6789",
    company: "Marketing Inc",
    status: "inactive",
    totalOrders: 5,
    totalSpent: 750,
    lastOrder: "2023-12-20",
    rating: 3,
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+1 (555) 456-7890",
    company: "Startup Labs",
    status: "active",
    totalOrders: 15,
    totalSpent: 3200,
    lastOrder: "2024-01-14",
    rating: 5,
  },
  {
    id: "5",
    name: "Tom Brown",
    email: "tom.brown@example.com",
    phone: "+1 (555) 567-8901",
    company: "Enterprise Co",
    status: "pending",
    totalOrders: 3,
    totalSpent: 450,
    lastOrder: "2024-01-10",
    rating: 4,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "default"
    case "inactive":
      return "secondary"
    case "pending":
      return "outline"
    default:
      return "secondary"
  }
}

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }).map((_, i) => (
    <Star key={i} className={`h-3 w-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
  ))
}

export default function CustomersPage() {
  const { user, userLoading } = useDashboard()

  return (
    <div className="bg-background min-h-screen">
      <ResponsiveSidebar />
      <div className="md:pl-64 lg:pl-72">
        <ResponsiveHeader user={user} userLoading={userLoading} />
        <main className="p-4 sm:p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 sm:space-y-6">
            {/* Customer Stats */}
            <div className="gap-3 sm:gap-4 md:gap-6 grid grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Total Customers", value: "1,247", change: "+12%", icon: Users, color: "blue" },
                { title: "Active Customers", value: "1,068", change: "+8%", icon: Users, color: "green" },
                { title: "New This Month", value: "156", change: "+23%", icon: UserPlus, color: "purple" },
                { title: "Avg. Order Value", value: "$189", change: "+5%", icon: Users, color: "orange" },
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
                <Input placeholder="Search customers..." className="pl-10" />
              </div>
              <Button className="flex-shrink-0">
                <UserPlus className="mr-2 w-4 h-4" />
                Add Customer
              </Button>
              <Button variant="outline" className="flex-shrink-0 bg-transparent">
                <Filter className="mr-2 w-4 h-4" />
                Filter
              </Button>
            </div>

            {/* Customers Table */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Customer Directory</CardTitle>
                  <CardDescription>Manage your customer relationships and track their activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead className="hidden sm:table-cell">Company</TableHead>
                          <TableHead className="hidden md:table-cell">Contact</TableHead>
                          <TableHead className="text-right">Orders</TableHead>
                          <TableHead className="text-right">Spent</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="hidden lg:table-cell">Rating</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {customersData.map((customer, index) => (
                          <motion.tr
                            key={customer.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="hover:bg-muted/50 transition-colors"
                          >
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={customer.name} />
                                  <AvatarFallback className="text-xs">
                                    {customer.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-sm">{customer.name}</p>
                                  <p className="text-muted-foreground text-xs">{customer.email}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">{customer.company}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              <div className="flex items-center space-x-2">
                                <Mail className="w-3 h-3 text-muted-foreground" />
                                <Phone className="w-3 h-3 text-muted-foreground" />
                              </div>
                            </TableCell>
                            <TableCell className="text-right">{customer.totalOrders}</TableCell>
                            <TableCell className="text-right">${customer.totalSpent.toLocaleString()}</TableCell>
                            <TableCell>
                              <Badge variant={getStatusColor(customer.status)}>{customer.status}</Badge>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                              <div className="flex items-center space-x-1">{renderStars(customer.rating)}</div>
                            </TableCell>
                          </motion.tr>
                        ))}
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
