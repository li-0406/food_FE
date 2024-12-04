import { configureStore } from "@reduxjs/toolkit"
import apiSlice from "./apiSlice"

export default configureStore({
  reducer: apiSlice
})
