import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import Config from "@/config"
import { store } from "."
import { setPokesList } from "./pokeMonSlice"
import type { defaultListResponse, listPokeMon, Pokemon } from "./types"

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: Config.API_URL }),
  endpoints: (build) => ({
    getPokemonList: build.query<listPokeMon[], null>({
      query: () => `/`,
      transformResponse: (response: defaultListResponse) => {
        store.dispatch(setPokesList(response.results))
        return response.results
      },
    }),
    getPokemonByName: build.query<Pokemon, string>({
      query: (name) => `/${name}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery, useGetPokemonListQuery } = pokemonApi
