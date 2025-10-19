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
