import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { pokemonApi } from "./pokeMonApi"
import pokeReducer from "./pokeMonSlice"
export const store = configureStore({
  reducer: {
    poke: pokeReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
})
setupListeners(store.dispatch)
