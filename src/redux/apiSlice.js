import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../api"

export const fetchFreshfoods = createAsyncThunk("user/fetchUser", async () => {
  const response = await api.get("/freshfoods/")
  return response.data
})

const apiSlice = createSlice({
  name: "counter",
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFreshfoods.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFreshfoods.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchFreshfoods.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default apiSlice.reducer
