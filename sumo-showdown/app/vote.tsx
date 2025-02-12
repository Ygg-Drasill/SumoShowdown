import { Link } from "expo-router";
import { View } from "react-native";

export default function Vote() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Link href={"/"}>View details</Link>
        </View>
    );
}