import { Header } from "@/components/Header"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { useGetPokemonListQuery } from "@/store/pokeMonApi"
import { $root } from "@/theme/styles"
import { FC } from "react"
interface PokeMonsListScreenProps extends AppStackScreenProps<"PokeMonsList"> {}

export const PokeMonsListScreen: FC<PokeMonsListScreenProps> = ({ navigation }) => {
  const { data, error } = useGetPokemonListQuery(null)
  console.log(data, error)
  return (
    <Screen style={$root} preset="scroll">
      <Header title="Hamza PookeMons" />
      <Text text="pokeMonsList" />
    </Screen>
  )
}
