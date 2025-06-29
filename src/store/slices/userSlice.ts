import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: string
  department: string
  joinDate: string
}

interface UserState {
  user: User | null
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
}

export const fetchUserData = createAsyncThunk("user/fetchData", async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  return {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Sales Manager",
    department: "Sales & Marketing",
    joinDate: "2022-03-15",
  }
})

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch user data"
      })
  },
})

export default userSlice.reducer
