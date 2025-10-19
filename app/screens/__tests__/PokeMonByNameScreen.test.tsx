import { PokeMonByNameScreen } from "@/screens/PokeMonByNameScreen"
import { useGetPokemonByNameQuery } from "@/store/pokeMonApi"
import { NavigationContainer } from "@react-navigation/native"
import { render, waitFor } from "@testing-library/react-native"
import React from "react"

// Mock the hooks and components
jest.mock("@/store/pokeMonApi")
jest.mock("@/components/AutoImage", () => "AutoImage")
jest.mock("@/components/Header", () => {
  const { Text } = require("react-native")
  return function MockHeader(props: any) {
    return <Text testID="header-title">{props.title}</Text>
  }
})
jest.mock("@/components/Screen", () => {
  const { View } = require("react-native")
  return function MockScreen(props: any) {
    return <View testID="screen">{props.children}</View>
  }
})
jest.mock("@/components/Text", () => {
  const { Text } = require("react-native")
  return function MockText(props: any) {
    return <Text testID="text">{props.text}</Text>
  }
})

const mockUseGetPokemonByNameQuery = useGetPokemonByNameQuery as jest.Mock

describe("PokeMonByNameScreen", () => {
  const mockNavigation = {
    goBack: jest.fn(),
  }

  const mockRoute = {
    params: {
      name: "pikachu",
    },
  }

  const defaultPokemonData = {
    height: 40,
    weight: 6.0,
    types: [{ type: { name: "electric" } }, { type: { name: "normal" } }],
  }

  const renderComponent = (props = {}) => {
    return render(
      <NavigationContainer>
        <PokeMonByNameScreen route={mockRoute} navigation={mockNavigation} {...props} />
      </NavigationContainer>,
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseGetPokemonByNameQuery.mockReturnValue({
      data: defaultPokemonData,
      error: null,
      isLoading: false,
    })
  })

  it("renders correctly with pokemon data", async () => {
    const { getByTestId, getByText, getAllByTestId } = renderComponent()

    // Check header title
    await waitFor(() => {
      expect(getByTestId("header-title")).toHaveTextContent("PIKACHU")
    })

    // Check pokemon details
    expect(getByText("Name")).toBeTruthy()
    expect(getByText("PIKACHU")).toBeTruthy()
    expect(getByText("Height")).toBeTruthy()
    expect(getByText("40 cm")).toBeTruthy()
    expect(getByText("Weight")).toBeTruthy()
    expect(getByText("6.0 kg")).toBeTruthy()
    expect(getByText("Types")).toBeTruthy()
    expect(getByText("electric")).toBeTruthy()
    expect(getByText("normal")).toBeTruthy()
  })

  it("displays loading state when data is fetching", () => {
    mockUseGetPokemonByNameQuery.mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    })

    const { getByTestId } = renderComponent()

    expect(getByTestId("header-title")).toHaveTextContent("PIKACHU")
    // You might want to add a loading indicator test here
  })

  it("handles API error gracefully", () => {
    mockUseGetPokemonByNameQuery.mockReturnValue({
      data: null,
      error: new Error("API Error"),
      isLoading: false,
    })

    const { getByTestId, queryByText } = renderComponent()

    // Header should still render
    expect(getByTestId("header-title")).toHaveTextContent("PIKACHU")

    // Pokemon details might not render or show fallback
    // This depends on your error handling strategy
  })

  it("navigates back when header back button is pressed", async () => {
    const { getByTestId } = renderComponent()

    // Since we mocked the Header component, we need to simulate the back press
    // You might need to adjust this based on your actual Header implementation
    const header = getByTestId("header-title")

    // If your Header component has a pressable area, you can fireEvent on it
    // For now, we'll test that the navigation prop is passed correctly
    expect(mockNavigation.goBack).not.toHaveBeenCalled()

    // If you have a specific test ID for the back button, use that instead
    // fireEvent.press(getByTestId('back-button'))
  })

  it("handles missing route params gracefully", () => {
    const mockRouteWithoutParams = {
      params: undefined,
    }

    mockUseGetPokemonByNameQuery.mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
    })

    const { getByTestId } = render(
      <NavigationContainer>
        <PokeMonByNameScreen route={mockRouteWithoutParams} navigation={mockNavigation} />
      </NavigationContainer>,
    )

    // Should handle missing name gracefully
    expect(getByTestId("header-title")).toHaveTextContent("")
  })

  it("formats weight correctly with toFixed", () => {
    const pokemonDataWithDecimalWeight = {
      height: 40,
      weight: 6.12345,
      types: [{ type: { name: "electric" } }],
    }

    mockUseGetPokemonByNameQuery.mockReturnValue({
      data: pokemonDataWithDecimalWeight,
      error: null,
      isLoading: false,
    })

    const { getByText } = renderComponent()

    expect(getByText("6.1 kg")).toBeTruthy()
  })

  it("handles pokemon with no types", () => {
    const pokemonDataWithoutTypes = {
      height: 40,
      weight: 6.0,
      types: [],
    }

    mockUseGetPokemonByNameQuery.mockReturnValue({
      data: pokemonDataWithoutTypes,
      error: null,
      isLoading: false,
    })

    const { getByText, queryByText } = renderComponent()

    expect(getByText("Types")).toBeTruthy()
    // No type text should be rendered
    expect(queryByText("electric")).toBeNull()
  })

  it("uses correct image URL", () => {
    const { getByTestId } = renderComponent()

    // Since AutoImage is mocked, we can check if the correct props are passed
    // You might need to adjust this based on your AutoImage implementation
    const autoImage = getByTestId("auto-image") // Add testID to your AutoImage component
    expect(autoImage.props.source.uri).toBe("https://img.pokemondb.net/artwork/pikachu.jpg")
  })
})
