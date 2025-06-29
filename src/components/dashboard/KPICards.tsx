"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Target } from "lucide-react"
import { KPICardSkeleton } from "@/components/ui/loading-skeleton"

interface KPICardsProps {
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

export const KPICards: React.FC<KPICardsProps> = ({ kpis, loading }) => {
  if (loading) {
    return (
      <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-4">
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
    <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-4">
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
              <CardTitle className="font-bold text-muted-foreground text-sm uppercase tracking-wide">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br ${card.gradient} shadow-lg`}>
                <card.icon className="w-4 h-4 text-white" />
              </div>
            </CardHeader>
            <CardContent className="z-10 relative">
              <div className="mb-2 font-black text-foreground text-3xl tracking-tight">{card.value}</div>
              <div className="flex items-center font-semibold text-sm">
                {card.positive ? (
                  <TrendingUp className="mr-2 w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="mr-2 w-4 h-4 text-red-500" />
                )}
                <span className={`font-bold ${card.positive ? "text-green-600" : "text-red-600"}`}>{card.change}</span>
                <span className="ml-2 font-medium text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
