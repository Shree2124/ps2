"use client"

import { motion } from "framer-motion"
import { useDashboard } from "@/hooks/useDashboard"
import { ResponsiveHeader } from "@/components/layouts/ResponsiveHeader"
import { ResponsiveSidebar } from "@/components/layouts/ResponsiveSidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { TrendingUp, DollarSign, Target, Users, Plus, Filter } from "lucide-react"

const salesTeamData = [
  { name: "Sarah Johnson", deals: 23, revenue: 145000, target: 120000, completion: 121 },
  { name: "Mike Chen", deals: 18, revenue: 98000, target: 100000, completion: 98 },
  { name: "Emily Davis", deals: 31, revenue: 187000, target: 150000, completion: 125 },
  { name: "James Wilson", deals: 15, revenue: 76000, target: 80000, completion: 95 },
  { name: "Lisa Brown", deals: 27, revenue: 156000, target: 130000, completion: 120 },
]

const salesForecast = [
  { month: "Jan", actual: 45000, forecast: 42000 },
  { month: "Feb", actual: 52000, forecast: 48000 },
  { month: "Mar", actual: 48000, forecast: 50000 },
  { month: "Apr", actual: 61000, forecast: 55000 },
  { month: "May", actual: 55000, forecast: 58000 },
  { month: "Jun", actual: 67000, forecast: 62000 },
]

export default function SalesPage() {
  const { user, userLoading } = useDashboard()

  return (
    <div className="bg-background min-h-screen">
      <ResponsiveSidebar />
      <div className="md:pl-64 lg:pl-72">
        <ResponsiveHeader
          user={user}
          userLoading={userLoading}
          currentPath="/sales"
          title="Sales"
          subtitle="Track your sales performance and team metrics"
        />
        <main className="p-4 sm:p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 sm:space-y-6">
            {/* Sales Actions */}
            <div className="flex sm:flex-row flex-col gap-3 sm:gap-4">
              <Button className="flex-1 sm:flex-none">
                <Plus className="mr-2 w-4 h-4" />
                New Deal
              </Button>
              <Button variant="outline" className="flex-1 sm:flex-none bg-transparent">
                <Filter className="mr-2 w-4 h-4" />
                Filter
              </Button>
            </div>

            {/* Sales KPIs */}
            <div className="gap-3 sm:gap-4 md:gap-6 grid grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Monthly Revenue", value: "$67,000", change: "+22%", icon: DollarSign, color: "green" },
                { title: "Deals Closed", value: "114", change: "+18%", icon: Target, color: "blue" },
                { title: "Conversion Rate", value: "3.2%", change: "+0.5%", icon: TrendingUp, color: "purple" },
                { title: "Active Leads", value: "1,247", change: "+12%", icon: Users, color: "orange" },
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

            {/* Charts and Tables */}
            <div className="gap-4 sm:gap-6 grid grid-cols-1 xl:grid-cols-3">
              <div className="xl:col-span-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Sales Forecast</CardTitle>
                      <CardDescription>Actual vs forecasted sales performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={salesForecast}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="actual" stroke="#8884d8" strokeWidth={2} />
                          <Line type="monotone" dataKey="forecast" stroke="#82ca9d" strokeDasharray="5 5" />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <div className="xl:col-span-1">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Sales Team Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {salesTeamData.slice(0, 5).map((member) => (
                          <div key={member.name} className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-sm">{member.name}</p>
                              <p className="text-muted-foreground text-xs">{member.deals} deals</p>
                            </div>
                            <Badge variant={member.completion >= 100 ? "default" : "secondary"}>
                              {member.completion}%
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>

            {/* Sales Team Table */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Sales Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Sales Rep</TableHead>
                          <TableHead className="text-right">Deals</TableHead>
                          <TableHead className="text-right">Revenue</TableHead>
                          <TableHead className="text-right">Target</TableHead>
                          <TableHead className="text-right">Completion</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {salesTeamData.map((member) => (
                          <TableRow key={member.name}>
                            <TableCell className="font-medium">{member.name}</TableCell>
                            <TableCell className="text-right">{member.deals}</TableCell>
                            <TableCell className="text-right">${member.revenue.toLocaleString()}</TableCell>
                            <TableCell className="text-right">${member.target.toLocaleString()}</TableCell>
                            <TableCell className="text-right">
                              <Badge variant={member.completion >= 100 ? "default" : "secondary"}>
                                {member.completion}%
                              </Badge>
                            </TableCell>
                          </TableRow>
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
