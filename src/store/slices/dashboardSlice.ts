import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export interface SalesData {
  month: string
  revenue: number
  orders: number
  customers: number
}

export interface ProductData {
  name: string
  sales: number
  revenue: number
  growth: number
}

export interface RegionData {
  region: string
  sales: number
  percentage: number
}

interface DashboardState {
  salesData: SalesData[]
  productData: ProductData[]
  regionData: RegionData[]
  kpis: {
    totalRevenue: number
    totalOrders: number
    totalCustomers: number
    conversionRate: number
    revenueGrowth: number
    orderGrowth: number
  }
  loading: boolean
  error: string | null
}

const initialState: DashboardState = {
  salesData: [],
  productData: [],
  regionData: [],
  kpis: {
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    conversionRate: 0,
    revenueGrowth: 0,
    orderGrowth: 0,
  },
  loading: false,
  error: null,
}

// Simulate API call - replace this with actual API call
export const fetchDashboardData = createAsyncThunk("dashboard/fetchData", async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const salesData: SalesData[] = [
    { month: "Jan", revenue: 45000, orders: 120, customers: 89 },
    { month: "Feb", revenue: 52000, orders: 145, customers: 102 },
    { month: "Mar", revenue: 48000, orders: 132, customers: 95 },
    { month: "Apr", revenue: 61000, orders: 168, customers: 118 },
    { month: "May", revenue: 55000, orders: 155, customers: 108 },
    { month: "Jun", revenue: 67000, orders: 189, customers: 134 },
    { month: "Jul", revenue: 72000, orders: 201, customers: 145 },
    { month: "Aug", revenue: 69000, orders: 195, customers: 139 },
    { month: "Sep", revenue: 78000, orders: 218, customers: 156 },
    { month: "Oct", revenue: 82000, orders: 235, customers: 167 },
    { month: "Nov", revenue: 89000, orders: 251, customers: 178 },
    { month: "Dec", revenue: 95000, orders: 267, customers: 189 },
  ]

  const productData: ProductData[] = [
    { name: "Premium Package", sales: 1250, revenue: 125000, growth: 12.5 },
    { name: "Standard Package", sales: 2100, revenue: 84000, growth: 8.3 },
    { name: "Basic Package", sales: 3200, revenue: 64000, growth: -2.1 },
    { name: "Enterprise", sales: 450, revenue: 180000, growth: 25.7 },
    { name: "Starter", sales: 1800, revenue: 36000, growth: 5.2 },
  ]

  const regionData: RegionData[] = [
    { region: "North America", sales: 45, percentage: 45 },
    { region: "Europe", sales: 28, percentage: 28 },
    { region: "Asia Pacific", sales: 18, percentage: 18 },
    { region: "Latin America", sales: 6, percentage: 6 },
    { region: "Others", sales: 3, percentage: 3 },
  ]

  const kpis = {
    totalRevenue: 773000,
    totalOrders: 2275,
    totalCustomers: 1520,
    conversionRate: 3.2,
    revenueGrowth: 15.8,
    orderGrowth: 12.4,
  }

  return { salesData, productData, regionData, kpis }
})

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false
        state.salesData = action.payload.salesData
        state.productData = action.payload.productData
        state.regionData = action.payload.regionData
        state.kpis = action.payload.kpis
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch data"
      })
  },
})

export default dashboardSlice.reducer
