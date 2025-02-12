import { Shadows, createTheme } from '@mui/material/styles';

export const theme = createTheme({
	shadows: Array(25).fill('none') as Shadows,
	palette: {
		mode: 'light',
		text: {
			primary: '#000000',
		},
		primary: {
			main: '#f3384b',
            dark: '#ab2936',
		},
		secondary: {
			main: '#ff6600',
		},
		background: {
			default: '#e7f5f5',
			paper: '#f7fdfd',
		},
	},
	typography: {
		fontFamily: 'Geist-Regular',
	},
});

//Red: #f3384b
//White: #FFFAF0
//Blue: #141b28

export default theme;
