"use client"

import type React from "react"

import { Provider } from "react-redux"
import { store } from "@/store/store"
import { ThemeProvider } from "@/contexts/ThemeContext"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  )
}
