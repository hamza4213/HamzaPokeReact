import { PokeMonsListScreen } from "@/screens/PokeMonsListScreen"
import { useGetPokemonListQuery } from "@/store/pokeMonApi"
import { renderWithProviders } from "@/test-utils"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"

// Mock the hooks
jest.mock("@/store/pokeMonApi")
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}))

const mockUseGetPokemonListQuery = useGetPokemonListQuery as jest.Mock
const mockNavigation = {
  navigate: jest.fn(),
}

// Create a wrapper with navigation
const Stack = createNativeStackNavigator()
const ScreenWrapper = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="PokeMonsList"
        component={PokeMonsListScreen}
        initialParams={{ navigation: mockNavigation }}
      />
    </Stack.Navigator>
  </NavigationContainer>
)

describe("PokeMonsListScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders loading state", () => {
    mockUseGetPokemonListQuery.mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    })

    const { getByText } = renderWithProviders(<ScreenWrapper />)

    expect(getByText("PookeMons")).toBeTruthy()
  })

  it("renders pokemon list from API data", () => {
    const mockPokemonList = [
      { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
      { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
    ]

    mockUseGetPokemonListQuery.mockReturnValue({
      data: { results: mockPokemonList },
      error: null,
      isLoading: false,
    })

    const { getByText } = renderWithProviders(<ScreenWrapper />)

    expect(getByText("PIKACHU")).toBeTruthy()
    expect(getByText("BULBASAUR")).toBeTruthy()
  })

  it("renders pokemon list from Redux store when API fails", () => {
    const mockStorePokemonList = [
      { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
    ]

    mockUseGetPokemonListQuery.mockReturnValue({
      data: null,
      error: new Error("API Error"),
      isLoading: false,
    })

    const { getByText } = renderWithProviders(<ScreenWrapper />, {
      preloadedState: {
        poke: {
          pokelist: mockStorePokemonList,
        },
      },
    })

    expect(getByText("CHARMANDER")).toBeTruthy()
  })

  it("navigates to detail screen when pokemon is pressed", () => {
    const mockPokemonList = [{ name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" }]

    mockUseGetPokemonListQuery.mockReturnValue({
      data: { results: mockPokemonList },
      error: null,
      isLoading: false,
    })

    const { getByText } = renderWithProviders(<ScreenWrapper />)

    const pokemonItem = getByText("PIKACHU")
    // You might need to adjust this based on your actual pressable area
    pokemonItem.parent?.props.onPress()

    expect(mockNavigation.navigate).toHaveBeenCalledWith("PokeMonByName", {
      name: "pikachu",
    })
  })
})
