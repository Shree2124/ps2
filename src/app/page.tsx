"use client"

import { motion } from "framer-motion"
import { useDashboard } from "@/hooks/useDashboard"
import { Header } from "@/components/layout/Header"
import { Sidebar } from "@/components/layout/Sidebar"
import { KPICards } from "@/components/dashboard/KPICards"
import { SalesChart } from "@/components/dashboard/SalesChart"
import { ProductChart } from "@/components/dashboard/ProductChart"
import { RegionChart } from "@/components/dashboard/RegionChart"
import { ProductTable } from "@/components/dashboard/ProductTable"

export default function Dashboard() {
  const { salesData, productData, regionData, kpis, loading, error, user, userLoading, userError } = useDashboard()

  if (error || userError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="mb-2 font-bold text-red-600 text-2xl">Error Loading Dashboard</h2>
          <p className="text-muted-foreground">{error || userError}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background min-h-screen">
      <Sidebar />
      <div className="md:pl-64">
        <Header user={user} userLoading={userLoading} />
        <main className="p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* KPI Cards */}
            <KPICards kpis={kpis} loading={loading} />

            {/* Charts Grid */}
            <div className="gap-6 grid md:grid-cols-2">
              <SalesChart data={salesData} loading={loading} />
              <ProductChart data={productData} loading={loading} />
            </div>

            <div className="gap-6 grid md:grid-cols-3">
              <div className="md:col-span-1">
                <RegionChart data={regionData} loading={loading} />
              </div>
              <div className="md:col-span-2">
                <ProductTable data={productData} loading={loading} />
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
