'use client';
import React from 'react';
// import type { Palette } from '@mui/material';
import { ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
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
  }

  interface PaletteOptions {
    tertiary?: Palette['tertiary'];
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
	const black = {300: grey[700], 400: grey[800], 500: '#333', 600: grey[900], 700: '#111', 800: '#000'};
  const [color, setColor] = React.useState<ColorsType|BlackType>(black);
  const [secondaryColor, setSecondaryColor] = React.useState<ColorsType|BlackType>(blueGrey);
  const [tertiaryColor, setTertiaryColor] = React.useState<ColorsType|BlackType>(grey);

	React.useEffect(() => {
		switch (colorLabel) {
			case 'red':
				setColor(red);
				setSecondaryColor(amber);
				setTertiaryColor(pink);
				break;
			case 'pink':
				setColor(pink);
				setSecondaryColor(orange);
				setTertiaryColor(purple);
				break;
			case 'purple':
				setColor(purple);
				setSecondaryColor(deepOrange);
				setTertiaryColor(deepPurple);
				break;
			case 'deep purple':
				setColor(deepPurple);
				setSecondaryColor(red);
				setTertiaryColor(indigo);
				break;
			case 'indigo':
				setColor(indigo);
				setSecondaryColor(pink);
				setTertiaryColor(blue);
				break;
			case 'blue':
				setColor(blue);
				setSecondaryColor(purple);
				setTertiaryColor(lightBlue);
				break;
			case 'light blue':
				setColor(lightBlue);
				setSecondaryColor(deepPurple);
				setTertiaryColor(cyan);
				break;
			case 'cyan':
				setColor(cyan);
				setSecondaryColor(indigo);
				setTertiaryColor(teal);
				break;
			case 'teal':
				setColor(teal);
				setSecondaryColor(blue);
				setTertiaryColor(green);
				break;
			case 'green':
				setColor(green);
				setSecondaryColor(lightBlue);
				setTertiaryColor(lightGreen);
				break;
			case 'light green':
				setColor(lightGreen);
				setSecondaryColor(cyan);
				setTertiaryColor(lime);
				break;
			case 'lime':
				setColor(lime);
				setSecondaryColor(teal);
				setTertiaryColor(yellow);
				break;
			case 'yellow':
				setColor(yellow);
				setSecondaryColor(green);
				setTertiaryColor(amber);
				break;
			case 'amber':
				setColor(amber);
				setSecondaryColor(lightGreen);
				setTertiaryColor(orange);
				break;
			case 'orange':
				setColor(orange);
				setSecondaryColor(lime);
				setTertiaryColor(deepOrange);
				break;
			case 'deep orange':
				setColor(deepOrange);
				setSecondaryColor(yellow);
				setTertiaryColor(red);
				break;
			case 'grey':
				setColor(grey);
				setSecondaryColor(blueGrey);
				setTertiaryColor(black);
				break;
			case 'black/white':
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
