import { createSystem, defaultConfig, defineConfig, defineTokens } from "@chakra-ui/react";

const tokens = defineTokens({
  colors: {
    primary: {value: "#F3384B"},
    dark: {value: "#141B28"},
    light: {value: "#FFFAF0"}
  },
  fonts: {
    body: { value: "system-ui, sans-serif" },
  },
  shadows: {
    default: { value: "0 8px 20px -4px rgba(9, 9, 12, 0.15)" },
  }
},)

const config = defineConfig({
    theme: {
      tokens: tokens
    },
})

const system = createSystem(defaultConfig, config)
export default system