import useColorTheme from "@/hooks/useColors";
import { StyleSheet, TextInput, TextInputProps } from "react-native";


export default function SumoTextInput(props: TextInputProps) {
    const c = useColorTheme()
    const textInputStyles = StyleSheet.create({
        button: {
            borderColor: c.primary,
            borderBottomWidth: 2,
            color: c.text,
            fontSize: 32,
        }
    })

    return <TextInput style={textInputStyles.button} {...props}/>
}

