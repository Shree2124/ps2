import { configureStore } from "@reduxjs/toolkit"
import themeSlice from "./slices/themeSlice"
import dashboardSlice from "./slices/dashboardSlice"
import userSlice from "./slices/userSlice"

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    dashboard: dashboardSlice,
    user: userSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
