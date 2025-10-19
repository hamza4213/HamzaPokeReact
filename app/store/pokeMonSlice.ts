import { createSlice } from "@reduxjs/toolkit"

const pokeSlice = createSlice({
  name: "poke",
  initialState: {},
  reducers: {
    todoAdded(state, action) {},
    todoToggled(state, action) {},
  },
})

export const { todoAdded, todoToggled } = pokeSlice.actions
export default pokeSlice.reducer
