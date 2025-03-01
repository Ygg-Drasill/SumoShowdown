import { Theme } from "@react-navigation/native";

export type SumoPalette = {
	background: string
	text: string
}

export type SumoColorTheme = {
	shadow: string,
	primary: string,
	light: SumoPalette
	dark: SumoPalette
}

export type SumoSizeTheme = {
	sm: number,
	md: number,
	lg: number,
	xl: number,
	"1xl": number,
	"2xl": number,
	"3xl": number,
}

export const c: SumoColorTheme = {
	shadow: "#09090C",
	primary: "#F3384B",
	light: {
		background: "#FFFAF0",
		text: "#141B28",
	},
	dark: {
		background: "#141B28",
		text: "#FFFAF0",
	},
};

export const s: {d: SumoSizeTheme, font: SumoSizeTheme} = {
	d: {
		sm: 8,
		md: 16,
		lg: 48,
		xl: 128,
		"1xl": 256,
		"2xl": 512,
		"3xl": 1028,
	},
	font: {
		sm: 8,
		md: 12,
		lg: 24,
		xl: 32,
		"1xl": 64,
		"2xl": 32,
		"3xl": 32,
	}
};

const t = {c, s}
export default t;