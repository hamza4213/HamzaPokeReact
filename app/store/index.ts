import AsyncStorage from "@react-native-async-storage/async-storage"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { persistReducer, persistStore } from "redux-persist"
import { pokemonApi } from "./pokeMonApi"
import pokeReducer from "./pokeMonSlice"
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["poke"],
}
const rootReducer = combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  poke: pokeReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(pokemonApi.middleware),
})

export const persistor = persistStore(store)
setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
