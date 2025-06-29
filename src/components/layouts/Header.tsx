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
import { Moon, Sun, Bell, Settings, LogOut, User } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import { Skeleton } from "@/components/ui/skeleton"

interface HeaderProps {
  user: {
    name: string
    email: string
    avatar: string
    role: string
  } | null
  userLoading: boolean
}

export const Header: React.FC<HeaderProps> = ({ user, userLoading }) => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="top-0 z-50 sticky bg-background/95 supports-[backdrop-filter]:bg-background/60 backdrop-blur border-b"
    >
      <div className="flex justify-between items-center px-6 h-16">
        <div>
          <h1 className="bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-black text-transparent text-3xl tracking-tight">
            SalesPro
          </h1>
          <p className="font-semibold text-muted-foreground text-sm tracking-wide">
            Welcome back! Here&apos;s your sales overview.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hover:bg-accent hover:scale-105 transition-all duration-200"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-accent hover:scale-105 transition-all duration-200"
          >
            <Bell className="w-5 h-5" />
            <span className="-top-1 -right-1 absolute bg-red-500 rounded-full w-3 h-3 animate-pulse" />
          </Button>

          {userLoading ? (
            <div className="flex items-center space-x-3">
              <Skeleton className="rounded-full w-10 h-10" />
              <div className="space-y-1">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-20 h-3" />
              </div>
            </div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative rounded-full w-10 h-10 hover:scale-105 transition-transform"
                >
                  <Avatar className="border-2 border-primary/20 w-10 h-10">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 font-bold text-white text-sm">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="end" forceMount>
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
