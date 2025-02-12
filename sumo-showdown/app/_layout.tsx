import ColorProvider from "@/components/themeprovider";
import useColorTheme from "@/hooks/useColors";
import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<ColorProvider>
			<InnerApp />
		</ColorProvider>
	);
}

function InnerApp() {
	const c = useColorTheme()
	return <Stack
	screenOptions={{
		headerStyle: {
			backgroundColor: c.primary,
		},
		headerTintColor: c.text,
		headerTitleStyle: {
			fontWeight: "bold",
		},
	}}
	>
	<Stack.Screen name="index" />
	<Stack.Screen name="vote" />
	<Stack.Screen name="join" />
</Stack>
}
