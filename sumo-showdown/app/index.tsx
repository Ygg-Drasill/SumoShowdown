import { Href, useRouter } from "expo-router";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import * as haptics from "expo-haptics"
import Ionicons from "@expo/vector-icons/Ionicons";
import t from "@/theme";

export default function Index() {
	const router = useRouter()
	const onPlayPress = () => {
		haptics.impactAsync(haptics.ImpactFeedbackStyle.Soft)
		router.replace("/join" as Href)
	}

	return (
		<SafeAreaView
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
            <View style={{flexDirection: "column", justifyContent: "center", alignItems: "flex-start", width: "100%", padding: t.s.d.lg}}>
                <Text style={{color: t.c.primary, fontSize: t.s.font.xl}}>Sumo</Text>
                <Text style={{color: t.c.primary, fontSize: t.s.font.xl}}>Showdown</Text>
            </View>
			<Pressable onPress={onPlayPress} style={{display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: t.c.primary, padding: t.s.d.lg, width: "100%"}}>
				<Text style={{color: t.c.dark.text, fontSize: t.s.font.xl}}>Play</Text>
				<Ionicons name="caret-forward-sharp" style={{color: t.c.dark.text, fontSize: t.s.font.xl}}/>
			</Pressable>
			<View style={{height: 2, width: "100%", backgroundColor: t.c.primary, marginTop: t.s.d.sm}}/>
			<View style={{height: 2, width: "100%", backgroundColor: t.c.primary, marginTop: t.s.d.sm}}/>
			<View style={{height: 2, width: "100%", backgroundColor: t.c.primary, marginTop: t.s.d.md}}/>
			<View style={{height: 2, width: "100%", backgroundColor: t.c.primary, marginTop: t.s.d.lg}}/>
		</SafeAreaView>
	);
}
