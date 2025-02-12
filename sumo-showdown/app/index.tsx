import { Href, Link, Redirect, useRouter } from "expo-router";
import { Button, Platform, Text, View } from "react-native";
import * as haptics from "expo-haptics"
import useColorTheme from "@/hooks/useColors";

export default function Index() {
	const col = useColorTheme()
	const router = useRouter()
	const onJoinPress = () => {
		haptics.notificationAsync(haptics.NotificationFeedbackType.Success)
		router.replace("/vote" as Href)
	}

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Button color={col.primary} title="Join" onPress={onJoinPress}/>
		</View>
	);
}
