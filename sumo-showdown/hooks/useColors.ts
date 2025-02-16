import { SumoColorContext } from "@/components/themeprovider";
import t, { SumoColorTheme, SumoPalette } from "@/theme";
import { ThemeContext } from "@react-navigation/native";
import { useContext } from "react";

export default function useColorTheme(): SumoPalette {
    const colors = useContext(SumoColorContext)
    if (colors==null) return t.c.light
    else return colors
}