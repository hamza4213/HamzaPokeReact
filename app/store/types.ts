export type Pokemon = {
  id: number
  name: string
  types: string[]
  level: number
  hp: number
  attack: number
  defense: number
  speed: number
  abilities?: string[]
  isLegendary?: boolean
}
export type listPokeMon = {
  name: string
  url: string
}
export type defaultListResponse = {
  count: number
  results: listPokeMon[]
  previous: null
  next: string
}
