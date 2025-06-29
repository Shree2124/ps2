"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart3, Home, ShoppingCart, Users, Settings, TrendingUp, Package, Calendar } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Sales", href: "/sales", icon: TrendingUp },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Products", href: "/products", icon: Package },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Settings", href: "/settings", icon: Settings },
]

export const ResponsiveSidebar: React.FC = () => {
  const pathname = usePathname()

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="hidden z-40 md:fixed md:inset-y-0 md:flex md:flex-col md:w-64 lg:w-72"
    >
      <div className="flex flex-col flex-grow bg-background shadow-lg pt-5 border-r overflow-y-auto">
        <div className="flex flex-shrink-0 items-center mb-8 px-4 lg:px-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex justify-center items-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 shadow-lg rounded-xl w-8 lg:w-10 h-8 lg:h-10">
                <BarChart3 className="w-5 lg:w-6 h-5 lg:h-6 text-white" />
              </div>
            </div>
            <div className="ml-3 lg:ml-4">
              <p className="font-black text-foreground text-lg lg:text-xl">SalesPro</p>
              <p className="font-bold text-muted-foreground text-xs uppercase tracking-wider">Analytics</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-grow">
          <ScrollArea className="flex-1 px-3 lg:px-4">
            <nav className="space-y-1 lg:space-y-2">
              {navigation.map((item, index) => {
                const isActive = pathname === item.href
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link href={item.href} className="block">
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start font-semibold text-sm transition-all duration-200",
                          isActive &&
                            "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-primary shadow-sm",
                        )}
                      >
                        <item.icon className="mr-3 w-4 lg:w-5 h-4 lg:h-5" />
                        {item.name}
                      </Button>
                    </Link>
                  </motion.div>
                )
              })}
            </nav>
          </ScrollArea>
        </div>
      </div>
    </motion.div>
  )
}
