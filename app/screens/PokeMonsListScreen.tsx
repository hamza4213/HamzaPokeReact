import { AutoImage } from "@/components/AutoImage"
import { Header } from "@/components/Header"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { RootState } from "@/store"
import { useGetPokemonListQuery } from "@/store/pokeMonApi"
import { listPokeMon } from "@/store/types"
import { spacing } from "@/theme/spacing"
import { $root, $styles } from "@/theme/styles"
import { FC } from "react"
import { FlatList, ListRenderItem, Pressable, ViewStyle } from "react-native"
import { useSelector } from "react-redux"
interface PokeMonsListScreenProps extends AppStackScreenProps<"PokeMonsList"> {}

export const PokeMonsListScreen: FC<PokeMonsListScreenProps> = ({ navigation }) => {
  const { data, error } = useGetPokemonListQuery(null)
  const { pokelist } = useSelector((state: RootState) => state.poke)
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
        <AutoImage source={{ uri: imageUrl }} style={$styles.image} />
        <Text text={pokeMon.name.toUpperCase()} weight="bold" />
      </Pressable>
    )
  }
  return (
    <Screen style={$root} preset="fixed">
      <Header title="PookeMons" />
      <FlatList
        data={data ?? pokelist}
        renderItem={renderPokeMons}
        showsVerticalScrollIndicator={false}
      />
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
