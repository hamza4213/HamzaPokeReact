import { FC } from "react"
import { ViewStyle } from "react-native"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
// import { useNavigation } from "@react-navigation/native"

interface PokeMonsListScreenProps extends AppStackScreenProps<"PokeMonsList"> {}

export const PokeMonsListScreen: FC<PokeMonsListScreenProps> = () => {
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <Text text="pokeMonsList" />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
