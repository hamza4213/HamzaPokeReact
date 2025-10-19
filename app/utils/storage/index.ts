import AsyncStorage from "@react-native-async-storage/async-storage"

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export async function loadString(key: string): Promise<string | null> {
  try {
    const value = await AsyncStorage.getItem(key)
    return value
  } catch (error) {
    console.error("loadString error:", error)
    return null
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to store.
 * @param value The string value to store.
 */
export async function saveString(key: string, value: string): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, value)
    return true
  } catch (error) {
    console.error("saveString error:", error)
    return false
  }
}

/**
 * Loads something from storage and runs it through JSON.parse.
 *
 * @param key The key to fetch.
 */
export async function load<T>(key: string): Promise<T | null> {
  try {
    const value = await AsyncStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : null
  } catch (error) {
    console.error("load error:", error)
    return null
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to store.
 * @param value The object or array to store.
 */
export async function save(key: string, value: unknown): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error("save error:", error)
    return false
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to delete.
 */
export async function remove(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {
    console.error("remove error:", error)
  }
}

/**
 * Clears all data from storage.
 */
export async function clear(): Promise<void> {
  try {
    await AsyncStorage.clear()
  } catch (error) {
    console.error("clear error:", error)
  }
}
