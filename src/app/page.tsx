"use client"

import { motion } from "framer-motion"
import { useDashboard } from "@/hooks/useDashboard"
import { ResponsiveHeader } from "@/components/layouts/ResponsiveHeader"
import { ResponsiveSidebar } from "@/components/layouts/ResponsiveSidebar"
import { ResponsiveKPICards } from "@/components/dashboard/ResponsiveKPICards"
import { SalesChart } from "@/components/dashboard/SalesChart"
import { ProductChart } from "@/components/dashboard/ProductChart"
import { RegionChart } from "@/components/dashboard/RegionChart"
import { ProductTable } from "@/components/dashboard/ProductTable"

export default function Dashboard() {
  const { salesData, productData, regionData, kpis, loading, error, user, userLoading, userError } = useDashboard()

  if (error || userError) {
    return (
      <div className="flex justify-center items-center p-4 min-h-screen">
        <div className="text-center">
          <h2 className="mb-2 font-bold text-red-600 text-xl sm:text-2xl">Error Loading Dashboard</h2>
          <p className="text-muted-foreground text-sm sm:text-base">{error || userError}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background min-h-screen">
      <ResponsiveSidebar />
      <div className="md:pl-64 lg:pl-72">
        <ResponsiveHeader user={user} userLoading={userLoading} currentPath="/" />
        <main className="p-4 sm:p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 sm:space-y-6">
            {/* KPI Cards */}
            <ResponsiveKPICards kpis={kpis} loading={loading} />

            {/* Charts Grid */}
            <div className="gap-4 sm:gap-6 grid grid-cols-1 xl:grid-cols-2">
              <SalesChart data={salesData} loading={loading} />
              <ProductChart data={productData} loading={loading} />
            </div>

            <div className="gap-4 sm:gap-6 grid grid-cols-1 xl:grid-cols-3">
              <div className="xl:col-span-1">
                <RegionChart data={regionData} loading={loading} />
              </div>
              <div className="xl:col-span-2">
                <ProductTable data={productData} loading={loading} />
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
