import { Theme } from "@react-navigation/native";

export type SumoPalette = {
	primary: string
	background: string
	text: string
}

export type SumoColorTheme = {
	shadow: string,
	light: SumoPalette
	dark: SumoPalette
} 

export const c: SumoColorTheme = {
	shadow: "#09090C",
	light: {
		primary: "#F3384B",
		background: "#FFFAF0",
		text: "#141B28",
	},
	dark: {
		primary: "#F3384B",
		background: "#141B28",
		text: "#FFFAF0",
	},
};

export default c;