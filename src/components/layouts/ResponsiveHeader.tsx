"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun, Bell, Settings, LogOut, User, Search } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import { Skeleton } from "@/components/ui/skeleton"
import { MobileSidebar } from "./MobileSidebar"
import { Input } from "@/components/ui/input"
import { usePathname } from "next/navigation"

interface ResponsiveHeaderProps {
  user: {
    name: string
    email: string
    avatar: string
    role: string
  } | null
  userLoading: boolean
  currentPath?: string
  title?: string
  subtitle?: string
}

const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case "/":
      return { title: "Dashboard", subtitle: "Welcome back! Here's your sales overview." }
    case "/analytics":
      return { title: "Analytics", subtitle: "Deep insights into your website performance" }
    case "/sales":
      return { title: "Sales", subtitle: "Track your sales performance and team metrics" }
    case "/orders":
      return { title: "Orders", subtitle: "Manage and track all your orders" }
    case "/customers":
      return { title: "Customers", subtitle: "Manage your customer relationships" }
    case "/products":
      return { title: "Products", subtitle: "Manage your product catalog" }
    case "/calendar":
      return { title: "Calendar", subtitle: "Schedule and manage your events" }
    case "/settings":
      return { title: "Settings", subtitle: "Configure your dashboard preferences" }
    default:
      return { title: "SalesPro", subtitle: "Welcome back! Here's your sales overview." }
  }
}

export const ResponsiveHeader: React.FC<ResponsiveHeaderProps> = ({
  user,
  userLoading,
  currentPath,
  title: propTitle,
  subtitle: propSubtitle,
}) => {
  const { isDark, toggleTheme } = useTheme()
  const pathname = usePathname()

  // Use provided props first, then fall back to automatic detection
  const activePath = currentPath || pathname
  const { title: autoTitle, subtitle: autoSubtitle } = getPageTitle(activePath)
  const title = propTitle || autoTitle
  const subtitle = propSubtitle || autoSubtitle

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="top-0 z-50 sticky bg-background/95 supports-[backdrop-filter]:bg-background/60 backdrop-blur border-b"
    >
      <div className="flex justify-between items-center px-4 sm:px-6 h-16">
        <div className="flex items-center space-x-4">
          <MobileSidebar />
          <div className="hidden sm:block">
            <h1 className="bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-black text-transparent text-xl sm:text-2xl lg:text-3xl tracking-tight">
              {title}
            </h1>
            <p className="hidden lg:block font-semibold text-muted-foreground text-xs sm:text-sm tracking-wide">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex flex-1 mx-8 max-w-md">
          <div className="relative w-full">
            <Search className="top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2 transform" />
            <Input placeholder="Search dashboard..." className="bg-muted/50 pl-10 border-0 focus-visible:ring-1" />
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Search button for mobile */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hover:bg-accent hover:scale-105 transition-all duration-200"
          >
            {isDark ? <Sun className="w-4 sm:w-5 h-4 sm:h-5" /> : <Moon className="w-4 sm:w-5 h-4 sm:h-5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-accent hover:scale-105 transition-all duration-200"
          >
            <Bell className="w-4 sm:w-5 h-4 sm:h-5" />
            <span className="-top-1 -right-1 absolute bg-red-500 rounded-full w-2 sm:w-3 h-2 sm:h-3 animate-pulse" />
          </Button>

          {userLoading ? (
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Skeleton className="rounded-full w-8 sm:w-10 h-8 sm:h-10" />
              <div className="hidden sm:block space-y-1">
                <Skeleton className="w-16 sm:w-24 h-3 sm:h-4" />
                <Skeleton className="w-12 sm:w-20 h-2 sm:h-3" />
              </div>
            </div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative rounded-full w-8 sm:w-10 h-8 sm:h-10 hover:scale-105 transition-transform"
                >
                  <Avatar className="border-2 border-primary/20 w-8 sm:w-10 h-8 sm:h-10">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 font-bold text-white text-xs sm:text-sm">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 sm:w-64" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="font-bold text-sm leading-none">{user.name}</p>
                    <p className="font-medium text-muted-foreground text-xs leading-none">{user.email}</p>
                    <p className="font-semibold text-primary text-xs leading-none">{user.role}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="font-medium">
                  <User className="mr-2 w-4 h-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="font-medium">
                  <Settings className="mr-2 w-4 h-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="font-medium text-red-600">
                  <LogOut className="mr-2 w-4 h-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
      </div>
    </motion.header>
  )
}
