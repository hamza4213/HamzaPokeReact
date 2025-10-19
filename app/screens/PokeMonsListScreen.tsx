import { Header } from "@/components/Header"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { useGetPokemonListQuery } from "@/store/pokeMonApi"
import { listPokeMon } from "@/store/types"
import { spacing } from "@/theme/spacing"
import { $root } from "@/theme/styles"
import { FC } from "react"
import { FlatList, Image, ListRenderItem, Pressable, ViewStyle } from "react-native"
interface PokeMonsListScreenProps extends AppStackScreenProps<"PokeMonsList"> {}

export const PokeMonsListScreen: FC<PokeMonsListScreenProps> = ({ navigation }) => {
  const { data, error } = useGetPokemonListQuery(null)
  const renderPokeMons: ListRenderItem<listPokeMon> = ({ item: pokeMon, index }) => {
    const imageUrl = `https://img.pokemondb.net/artwork/${pokeMon.name}.jpg`
    return (
      <Pressable
        key={`${index}`}
        style={$pokeMonContainer}
        onPress={() => {
          navigation.navigate("PokeMonByName", {
            name: pokeMon.name,
          })
        }}
      >
        <Image source={{ uri: imageUrl }} style={{ height: 100, width: 100 }} />
        <Text text={pokeMon.name.toUpperCase()} weight="bold" />
      </Pressable>
    )
  }
  return (
    <Screen style={$root} preset="fixed">
      <Header title="PookeMons" />
      <FlatList data={data} renderItem={renderPokeMons} showsVerticalScrollIndicator={false} />
    </Screen>
  )
}
const $pokeMonContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: spacing.sm,
  marginHorizontal: spacing.lg,
}
