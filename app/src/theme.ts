import { createSystem, defaultConfig, defineConfig, defineRecipe, defineTokens } from "@chakra-ui/react";

const tokens = defineTokens({
  spacing: {
    gutter: { value: "12px" },
  },
  colors: {
    primary: {value: "#F3384B"},
    dark: {value: "#141B28"},
    light: {value: "#FFFAF0"}
  },
  fonts: {
    body: { value: "Bahianita, sans-serif" },
    heading: {value: "Bungee, sans-serif"}
  },
  fontSizes: {
    sm: { value: "16px" },
    md: { value: "24px" },
    lg: { value: "32px" },
    xl: { value: "48px" }
  },
  shadows: {
    default: { value: "0 8px 20px -4px rgba(9, 9, 12, 0.15)" },
  },
  radii: {
    sm: { value: "0px" },
    md: { value: "2px" },
    lg: { value: "4px" },
    round: {value: "9999px" }
  },
})

export const textRecipe = defineRecipe({
  base: {
    fontSize: "md"
  }
})

const config = defineConfig({
    theme: {
      tokens: tokens,
    },
})

const system = createSystem(defaultConfig, config)
export default system