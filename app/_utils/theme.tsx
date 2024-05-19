'use client';
import React from 'react';
// import type { Palette } from '@mui/material';
import { ThemeProvider, alpha, createTheme, useMediaQuery } from '@mui/material';
import { createClient } from './supabase/client';
import { amber, blue, blueGrey, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow } from '@mui/material/colors';
import { SnackbarProvider } from 'notistack';

declare module '@mui/material/styles' {
  // interface PaletteColor {
  //   lighter?: string;
	// 	extraLight?: string;
  // }

  // interface SimplePaletteColorOptions {
  //   lighter?: string;
	// 	extraLight?: string;
  // }

  interface Palette {
    tertiary: Palette['primary'];
		card: { paper: string, done: string };
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
		card?: { paper: string, done: string };
  }
}

type ColorsType = { 100: string, 200: string, 300: string, 400: string, 500: string, 600: string, 700: string, 800: string, 900: string, 'A100': string, 'A200': string, 'A400': string, 'A700': string };

// type ColorsType = typeof red|typeof pink|typeof purple|typeof deepPurple|typeof indigo|typeof blue|typeof lightBlue|typeof cyan|typeof teal|typeof green|typeof lightGreen|typeof lime|typeof yellow|typeof amber|typeof orange|typeof deepOrange|typeof grey|typeof blueGrey|BlackType;

type BlackType = { 300: string, 400: string, 500: string, 600: string, 700: string, 800: string };

export default function Theme({
  children,
	profileColor,
}: Readonly<{
  children: React.ReactNode
	profileColor: string|null,
}>) {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const supabase = createClient();
  const [colorLabel, setColorLabel] = React.useState<string | null>(profileColor||null);
	const black = {300: grey[700], 400: grey[800], 500: '#333', 600: grey[900], 700: '#111', 800: '#121212', 900: '#000'};
  const [color, setColor] = React.useState<ColorsType|BlackType>(black);
  const [secondaryColor, setSecondaryColor] = React.useState<ColorsType|BlackType>(blueGrey);
  const [tertiaryColor, setTertiaryColor] = React.useState<ColorsType|BlackType>(grey);

	React.useEffect(() => {
		switch (colorLabel) {
			case 'Red':
				setColor(red);
				setSecondaryColor(amber);
				setTertiaryColor(pink);
				break;
			case 'Pink':
				setColor(pink);
				setSecondaryColor(orange);
				setTertiaryColor(purple);
				break;
			case 'Purple':
				setColor(purple);
				setSecondaryColor(deepOrange);
				setTertiaryColor(deepPurple);
				break;
			case 'Deep Purple':
				setColor(deepPurple);
				setSecondaryColor(red);
				setTertiaryColor(indigo);
				break;
			case 'Indigo':
				setColor(indigo);
				setSecondaryColor(pink);
				setTertiaryColor(blue);
				break;
			case 'Blue':
				setColor(blue);
				setSecondaryColor(purple);
				setTertiaryColor(lightBlue);
				break;
			case 'Light Blue':
				setColor(lightBlue);
				setSecondaryColor(deepPurple);
				setTertiaryColor(cyan);
				break;
			case 'Cyan':
				setColor(cyan);
				setSecondaryColor(indigo);
				setTertiaryColor(teal);
				break;
			case 'Teal':
				setColor(teal);
				setSecondaryColor(blue);
				setTertiaryColor(green);
				break;
			case 'Green':
				setColor(green);
				setSecondaryColor(lightBlue);
				setTertiaryColor(lightGreen);
				break;
			case 'Light Green':
				setColor(lightGreen);
				setSecondaryColor(cyan);
				setTertiaryColor(lime);
				break;
			case 'Lime':
				setColor(lime);
				setSecondaryColor(teal);
				setTertiaryColor(yellow);
				break;
			case 'Yellow':
				setColor(yellow);
				setSecondaryColor(green);
				setTertiaryColor(amber);
				break;
			case 'Amber':
				setColor(amber);
				setSecondaryColor(lightGreen);
				setTertiaryColor(orange);
				break;
			case 'Orange':
				setColor(orange);
				setSecondaryColor(lime);
				setTertiaryColor(deepOrange);
				break;
			case 'Deep Orange':
				setColor(deepOrange);
				setSecondaryColor(yellow);
				setTertiaryColor(red);
				break;
			case 'Grey':
				setColor(grey);
				setSecondaryColor(blueGrey);
				setTertiaryColor(black);
				break;
			case 'Black / White':
				setColor(black);
				setSecondaryColor(blueGrey);
				setTertiaryColor(grey);
				break;
			default:
				setColor(black);
				setSecondaryColor(blueGrey);
				setTertiaryColor(grey);
				break;
		}
	}, [colorLabel]);

	const theme = React.useMemo(
		() =>
			createTheme({
				palette: {
					mode: prefersDarkMode ? 'dark': 'light',
					primary: {
						// extraLight: prefersDarkMode ? 'default' : alpha(color[50], 0.45),
						// lighter: prefersDarkMode ? alpha(color[900], 0.15) : color[50],
						// light: prefersDarkMode ? alpha(color[900], 0.5) : color[100],
						main: prefersDarkMode ? color[600] : color[500],
					},
					secondary: {
						main: secondaryColor[500],
					},
					tertiary: {
						main: prefersDarkMode ? tertiaryColor[600] : tertiaryColor[500],
						light: prefersDarkMode ? tertiaryColor[400] : tertiaryColor[300],
						dark: prefersDarkMode ? tertiaryColor[800] : tertiaryColor[700],
						contrastText: 'rgba(0, 0, 0, 0.87)',
					},
					card: {
						done: prefersDarkMode ? alpha(black[800], 0.2) : alpha(grey[50], 0.2),
						paper: prefersDarkMode ? alpha(black[800], 0.45) : alpha(grey[50], 0.45),
					},
				},
			}),
		[prefersDarkMode, color, secondaryColor, tertiaryColor],
	);

	React.useEffect(() => {
		const channel = supabase.channel('realtime profile color')
		.on('postgres_changes', {
			event: 'UPDATE',
			schema: 'public',
			table: 'profiles',
		}, (payload) => setColorLabel(payload.new.color))
		.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	});

	return (
		<ThemeProvider theme={theme}>
			<SnackbarProvider maxSnack={3} />
			{children}
		</ThemeProvider>
	);
}
