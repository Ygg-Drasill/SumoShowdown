import ColorProvider from "@/components/themeprovider";
import useColorTheme from "@/hooks/useColors";
import { Stack } from "expo-router";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
export default function RootLayout() {
	return (
		<ColorProvider>
			<QueryClientProvider client={queryClient}>
				<InnerApp />
			</QueryClientProvider>
		</ColorProvider>
	);
}

function InnerApp() {
	const c = useColorTheme()
	const baseStyles = StyleSheet.create({
		base: {
			backgroundColor: c.background,
			color: c.text
		}
	})
	return <Stack
		screenOptions={{
			headerStyle: {
				backgroundColor: c.background,
			},
			headerTintColor: c.text,
			headerTitleStyle: {
				fontWeight: "bold",
			},
			animation: "fade",
			animationDuration: 200,
			headerShown: false,
			contentStyle: baseStyles.base
		}}
	>
		<Stack.Screen name="index" />
		<Stack.Screen name="vote" />
		<Stack.Screen name="join" />
	</Stack>
}