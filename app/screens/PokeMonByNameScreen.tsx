import { Header } from "@/components/Header"
import { Screen } from "@/components/Screen"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { $root } from "@/theme/styles"
import { FC } from "react"

interface PokeMonByNameScreenProps extends AppStackScreenProps<"PokeMonByName"> {}

export const PokeMonByNameScreen: FC<PokeMonByNameScreenProps> = ({ route, navigation }) => {
  const { name } = route?.params
  return (
    <Screen style={$root} preset="scroll">
      <Header
        title={name.toUpperCase()}
        leftIcon="back"
        onLeftPress={() => {
          navigation.goBack()
        }}
      />
    </Screen>
  )
}
