"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart3, Home, ShoppingCart, Users, Settings, TrendingUp, Package, Calendar } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "#", icon: Home, current: true },
  { name: "Analytics", href: "#", icon: BarChart3, current: false },
  { name: "Sales", href: "#", icon: TrendingUp, current: false },
  { name: "Orders", href: "#", icon: ShoppingCart, current: false },
  { name: "Customers", href: "#", icon: Users, current: false },
  { name: "Products", href: "#", icon: Package, current: false },
  { name: "Calendar", href: "#", icon: Calendar, current: false },
  { name: "Settings", href: "#", icon: Settings, current: false },
]

export const Sidebar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="hidden z-40 md:fixed md:inset-y-0 md:flex md:flex-col md:w-64"
    >
      <div className="flex flex-col flex-grow bg-background shadow-lg pt-5 border-r overflow-y-auto">
        <div className="flex flex-shrink-0 items-center mb-8 px-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex justify-center items-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 shadow-lg rounded-xl w-10 h-10">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="ml-4">
              <p className="font-black text-foreground text-lg">SalesPro</p>
              <p className="font-bold text-muted-foreground text-xs uppercase tracking-wider">Analytics</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-grow">
          <ScrollArea className="flex-1 px-4">
            <nav className="space-y-2">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant={item.current ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start font-semibold text-sm transition-all duration-200",
                      item.current &&
                        "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-primary shadow-sm",
                    )}
                  >
                    <item.icon className="mr-3 w-5 h-5" />
                    {item.name}
                  </Button>
                </motion.div>
              ))}
            </nav>
          </ScrollArea>
        </div>
      </div>
    </motion.div>
  )
}
