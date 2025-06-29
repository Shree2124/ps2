"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Target } from "lucide-react"
import { KPICardSkeleton } from "@/components/ui/loading-skeleton"

interface ResponsiveKPICardsProps {
  kpis: {
    totalRevenue: number
    totalOrders: number
    totalCustomers: number
    conversionRate: number
    revenueGrowth: number
    orderGrowth: number
  }
  loading: boolean
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value)
}

const formatNumber = (value: number) => {
  return new Intl.NumberFormat("en-US").format(value)
}

export const ResponsiveKPICards: React.FC<ResponsiveKPICardsProps> = ({ kpis, loading }) => {
  if (loading) {
    return (
      <div className="gap-3 sm:gap-4 md:gap-6 grid grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <KPICardSkeleton key={i} />
        ))}
      </div>
    )
  }

  const cards = [
    {
      title: "Total Revenue",
      value: formatCurrency(kpis.totalRevenue),
      change: `+${kpis.revenueGrowth}%`,
      icon: DollarSign,
      positive: kpis.revenueGrowth > 0,
      gradient: "from-green-500 to-emerald-600",
    },
    {
      title: "Total Orders",
      value: formatNumber(kpis.totalOrders),
      change: `+${kpis.orderGrowth}%`,
      icon: ShoppingCart,
      positive: kpis.orderGrowth > 0,
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      title: "Total Customers",
      value: formatNumber(kpis.totalCustomers),
      change: "+8.2%",
      icon: Users,
      positive: true,
      gradient: "from-purple-500 to-violet-600",
    },
    {
      title: "Conversion Rate",
      value: `${kpis.conversionRate}%`,
      change: "+0.3%",
      icon: Target,
      positive: true,
      gradient: "from-orange-500 to-red-600",
    },
  ]

  return (
    <div className="gap-3 sm:gap-4 md:gap-6 grid grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="group"
        >
          <Card className="relative bg-gradient-to-br from-background to-muted/20 hover:shadow-xl border-0 overflow-hidden transition-all duration-300">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
            />
            <CardHeader className="z-10 relative flex flex-row justify-between items-center space-y-0 pb-2">
              <CardTitle className="font-bold text-muted-foreground text-xs sm:text-sm truncate uppercase tracking-wide">
                {card.title}
              </CardTitle>
              <div className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-br ${card.gradient} shadow-lg`}>
                <card.icon className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
              </div>
            </CardHeader>
            <CardContent className="z-10 relative">
              <div className="mb-1 sm:mb-2 font-black text-foreground text-lg sm:text-2xl lg:text-3xl tracking-tight">
                {card.value}
              </div>
              <div className="flex items-center font-semibold text-xs sm:text-sm">
                {card.positive ? (
                  <TrendingUp className="mr-1 sm:mr-2 w-3 sm:w-4 h-3 sm:h-4 text-green-500" />
                ) : (
                  <TrendingDown className="mr-1 sm:mr-2 w-3 sm:w-4 h-3 sm:h-4 text-red-500" />
                )}
                <span className={`font-bold ${card.positive ? "text-green-600" : "text-red-600"}`}>{card.change}</span>
                <span className="hidden sm:inline ml-1 sm:ml-2 font-medium text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
