import { createSystem, defaultConfig, defineConfig, defineRecipe, defineTokens } from "@chakra-ui/react";

const tokens = defineTokens({
  spacing: {
    hfullsafe: {value: "calc(var(--viewh, 1vh) * 100)"},
    gutter: { value: "12px" },
    sm: { value: "2px" },
    md: { value: "6px" },
    lg: { value: "16px" },
    xl: { value: "48px"}
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
    sm: { value: "24px" },
    md: { value: "32px" },
    lg: { value: "48px" },
    xl: { value: "48px" }
  },
  radii: {
    sm: { value: "0px" },
    md: { value: "2px" },
    lg: { value: "4px" },
    round: {value: "9999px" }
  },
  shadows: {
    default: { value: "0 8px 20px -4px rgba(9, 9, 12, 0.15)" }
  },
  borders: {
    default: {value: "2px solid #141B28"}
  },
  gradients: {
    primary: {
      bottom: {value: "linear-gradient(to top,  #F3384B 0%,  #00000000 50%)"},
      right: {value: "linear-gradient(to left,  #F3384B 0%,  #00000000 50%)"},
      left: {value: "linear-gradient(to right,  #F3384B 0%,  #00000000 50%)"},
      top: {value: "linear-gradient(to down,  #F3384B 0%,  #00000000 50%)"}
    },
  }
})

export const textRecipe = defineRecipe({
  base: {
    fontSize: "md"
  },
})

export const headingRecipe = defineRecipe({
  base: {
    fontSize: "md",
  },
  variants: {
    
  }
})

const config = defineConfig({
    theme: {
      tokens: tokens,
      recipes: {
        text: textRecipe,
        heading: headingRecipe
      }
    },
})

const system = createSystem(defaultConfig, config)
export default system