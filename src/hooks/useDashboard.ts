"use client"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/store/store"
import { fetchDashboardData } from "@/store/slices/dashboardSlice"
import { fetchUserData } from "@/store/slices/userSlice"

export const useDashboard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const dashboardState = useSelector((state: RootState) => state.dashboard)
  const userState = useSelector((state: RootState) => state.user)

  useEffect(() => {
    dispatch(fetchDashboardData())
    dispatch(fetchUserData())
  }, [dispatch])

  return {
    ...dashboardState,
    user: userState.user,
    userLoading: userState.loading,
    userError: userState.error,
  }
}
