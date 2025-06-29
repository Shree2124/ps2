"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Menu, BarChart3, Home, ShoppingCart, Users, Settings, TrendingUp, Package, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
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

export const MobileSidebar: React.FC = () => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-6 border-b">
              <div className="flex items-center">
                <div className="flex justify-center items-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-lg w-8 h-8">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div className="ml-3">
                  <p className="font-black text-lg">SalesPro</p>
                  <p className="font-bold text-muted-foreground text-xs uppercase tracking-wider">Analytics</p>
                </div>
              </div>
            </div>
            <ScrollArea className="flex-1 px-4 py-4">
              <nav className="space-y-2">
                {navigation.map((item, index) => {
                  const isActive = pathname === item.href
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link href={item.href} className="block">
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-start font-semibold text-sm",
                            isActive &&
                              "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-primary",
                          )}
                          onClick={() => setOpen(false)}
                        >
                          <item.icon className="mr-3 w-5 h-5" />
                          {item.name}
                        </Button>
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
