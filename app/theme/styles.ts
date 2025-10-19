import { ImageStyle, ViewStyle } from "react-native"

/* Use this file to define styles that are used in multiple places in your app. */
export const $styles = {
  row: { flexDirection: "row", justifyContent: "space-between", marginVertical: 5 } as ViewStyle,
  flex1: { flex: 1 } as ViewStyle,
  flexWrap: { flexWrap: "wrap" } as ViewStyle,
  image: { height: 100, width: 100 } as ImageStyle,
  toggleInner: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  } as ViewStyle,
}
export const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: 10,
}
