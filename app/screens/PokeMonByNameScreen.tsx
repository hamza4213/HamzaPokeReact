import { AutoImage } from "@/components/AutoImage"
import { Header } from "@/components/Header"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { useGetPokemonByNameQuery } from "@/store/pokeMonApi"
import { $root, $styles } from "@/theme/styles"
import { FC } from "react"
import { View } from "react-native"

interface PokeMonByNameScreenProps extends AppStackScreenProps<"PokeMonByName"> {}

export const PokeMonByNameScreen: FC<PokeMonByNameScreenProps> = ({ route, navigation }) => {
  const { name } = route?.params
  const { data, error } = useGetPokemonByNameQuery(name)
  return (
    <Screen style={$root} preset="scroll">
      <Header
        title={name.toUpperCase()}
        leftIcon="back"
        onLeftPress={() => {
          navigation.goBack()
        }}
      />
      <AutoImage
        source={{ uri: `https://img.pokemondb.net/artwork/${name}.jpg` }}
        style={[$styles.image, { alignSelf: "center" }]}
      />
      <View style={$styles.row}>
        <Text text="Name" weight="bold" />
        <Text text={name.toUpperCase()} />
      </View>
      <View style={$styles.row}>
        <Text text="Height" weight="bold" />
        <Text text={`${data?.height} cm`} />
      </View>
      <View style={$styles.row}>
        <Text text="Weight" weight="bold" />
        <Text text={`${data?.weight.toFixed(1)} kg`} />
      </View>
      <View style={$styles.row}>
        <Text text="Types" weight="bold" />
        <View>
          {data?.types?.map((item, index) => {
            return <Text text={item?.type?.name} key={`${index}`} />
          })}
        </View>
      </View>
    </Screen>
  )
}
