import t from "@/theme";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export const SumoColorContext = createContext(t.c.light)

export default function ColorProvider(props: {children: ReactNode}) {
    const colorScheme = useColorScheme()
    const [theme, setTheme] = useState(t.c.light)
    useEffect(() => {
        setTheme(t.c[colorScheme ?? "light"])
    }, [colorScheme])

    return <SumoColorContext.Provider value={theme}>
        {props.children}
    </SumoColorContext.Provider>
}