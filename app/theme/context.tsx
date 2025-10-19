import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavDefaultTheme,
  Theme as NavTheme,
} from "@react-navigation/native"
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { StyleProp, useColorScheme } from "react-native"

import { setImperativeTheming } from "./context.utils"
import { darkTheme, lightTheme } from "./theme"

import type {
  AllowedStylesT,
  ImmutableThemeContextModeT,
  Theme,
  ThemeContextModeT,
  ThemedFnT,
  ThemedStyle,
} from "./types"

export type ThemeContextType = {
  navigationTheme: NavTheme
  setThemeContextOverride: (newTheme: ThemeContextModeT) => void
  theme: Theme
  themeContext: ImmutableThemeContextModeT
  themed: ThemedFnT
}

export const ThemeContext = createContext<ThemeContextType | null>(null)

export interface ThemeProviderProps {
  initialContext?: ThemeContextModeT
}

const STORAGE_KEY = "ignite.themeScheme"

/**
 * The ThemeProvider is the heart and soul of the design token system. It provides a context wrapper
 * for your entire app to consume the design tokens as well as global functionality like the app's theme.
 *
 * To get started, you want to wrap your entire app's JSX hierarchy in `ThemeProvider`
 * and then use the `useAppTheme()` hook to access the theme context.
 */
export const ThemeProvider: FC<PropsWithChildren<ThemeProviderProps>> = ({
  children,
  initialContext,
}) => {
  const systemColorScheme = useColorScheme()
  const [themeScheme, setThemeScheme] = useState<ThemeContextModeT | undefined>(undefined)

  // Load theme from AsyncStorage once
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(STORAGE_KEY)
        if (storedValue) setThemeScheme(storedValue as ThemeContextModeT)
      } catch (error) {
        console.error("Failed to load theme:", error)
      }
    }
    loadTheme()
  }, [])

  // Function to set and persist theme
  const setThemeContextOverride = useCallback(async (newTheme: ThemeContextModeT) => {
    try {
      setThemeScheme(newTheme)
      if (newTheme) {
        await AsyncStorage.setItem(STORAGE_KEY, newTheme)
      } else {
        await AsyncStorage.removeItem(STORAGE_KEY)
      }
    } catch (error) {
      console.error("Failed to save theme:", error)
    }
  }, [])

  // Decide which theme is active
  const themeContext: ImmutableThemeContextModeT = useMemo(() => {
    const t = initialContext || themeScheme || (systemColorScheme ?? "light")
    return t === "dark" ? "dark" : "light"
  }, [initialContext, themeScheme, systemColorScheme])

  const navigationTheme: NavTheme = useMemo(() => {
    return themeContext === "dark" ? NavDarkTheme : NavDefaultTheme
  }, [themeContext])

  const theme: Theme = useMemo(() => {
    return themeContext === "dark" ? darkTheme : lightTheme
  }, [themeContext])

  useEffect(() => {
    setImperativeTheming(theme)
  }, [theme])

  const themed = useCallback(
    <T,>(styleOrStyleFn: AllowedStylesT<T>) => {
      const flatStyles = [styleOrStyleFn].flat(3) as (ThemedStyle<T> | StyleProp<T>)[]
      const stylesArray = flatStyles.map((f) =>
        typeof f === "function" ? (f as ThemedStyle<T>)(theme) : f,
      )
      return Object.assign({}, ...stylesArray) as T
    },
    [theme],
  )

  const value = {
    navigationTheme,
    theme,
    themeContext,
    setThemeContextOverride,
    themed,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

/**
 * Hook for accessing the theme context.
 */
export const useAppTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useAppTheme must be used within a ThemeProvider")
  }
  return context
}
