"use client"

import { motion } from "framer-motion"
import { useDashboard } from "@/hooks/useDashboard"
import { ResponsiveHeader } from "@/components/layouts/ResponsiveHeader"
import { ResponsiveSidebar } from "@/components/layouts/ResponsiveSidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, BarChart, Bar } from "recharts"
import { TrendingUp, Users, ShoppingBag, DollarSign } from "lucide-react"

const analyticsData = [
  { month: "Jan", visitors: 4000, pageViews: 12000, bounceRate: 45 },
  { month: "Feb", visitors: 4500, pageViews: 13500, bounceRate: 42 },
  { month: "Mar", visitors: 4200, pageViews: 12600, bounceRate: 48 },
  { month: "Apr", visitors: 5100, pageViews: 15300, bounceRate: 38 },
  { month: "May", visitors: 4800, pageViews: 14400, bounceRate: 41 },
  { month: "Jun", visitors: 5500, pageViews: 16500, bounceRate: 35 },
]

const trafficSources = [
  { source: "Organic Search", visitors: 3200, percentage: 45 },
  { source: "Direct", visitors: 1800, percentage: 25 },
  { source: "Social Media", visitors: 1200, percentage: 17 },
  { source: "Email", visitors: 600, percentage: 8 },
  { source: "Referral", visitors: 350, percentage: 5 },
]

export default function AnalyticsPage() {
  const { user, userLoading } = useDashboard()

  return (
    <div className="bg-background min-h-screen">
      <ResponsiveSidebar />
      <div className="md:pl-64 lg:pl-72">
        <ResponsiveHeader
          user={user}
          userLoading={userLoading}
          currentPath="/analytics"
          title="Analytics"
          subtitle="Deep insights into your website performance"
        />
        <main className="p-4 sm:p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 sm:space-y-6">
            {/* Analytics KPIs */}
            <div className="gap-3 sm:gap-4 md:gap-6 grid grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Total Visitors", value: "28.5K", change: "+12.5%", icon: Users, color: "blue" },
                { title: "Page Views", value: "84.2K", change: "+8.3%", icon: TrendingUp, color: "green" },
                { title: "Bounce Rate", value: "42%", change: "-3.2%", icon: ShoppingBag, color: "purple" },
                { title: "Avg. Session", value: "3m 24s", change: "+15.7%", icon: DollarSign, color: "orange" },
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

            {/* Charts Grid */}
            <div className="gap-4 sm:gap-6 grid grid-cols-1 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Website Traffic</CardTitle>
                    <CardDescription>Monthly visitors and page views</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={analyticsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="visitors" stackId="1" stroke="#8884d8" fill="#8884d8" />
                        <Area type="monotone" dataKey="pageViews" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Traffic Sources</CardTitle>
                    <CardDescription>Where your visitors come from</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={trafficSources}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="source" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="visitors" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
