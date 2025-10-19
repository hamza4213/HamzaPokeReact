import { createSlice } from "@reduxjs/toolkit"
import { listPokeMon } from "./types"
type pokeState = {
  pokelist: listPokeMon[]
}
const initialState: pokeState = { pokelist: [] }

const pokeSlice = createSlice({
  name: "poke",
  initialState,
  reducers: {
    setPokesList(state, action) {
      state.pokelist = action.payload
    },
  },
})

export const { setPokesList } = pokeSlice.actions
export default pokeSlice.reducer
