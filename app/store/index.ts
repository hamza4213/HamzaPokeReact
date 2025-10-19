import { configureStore } from "@reduxjs/toolkit"

import pokeReducer from "./pokeMonSlice"

export const store = configureStore({
  reducer: {
    poke: pokeReducer,
  },
})
