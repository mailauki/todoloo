'use client';
import React from 'react';
import { ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import { createClient } from './supabase/client';
import { amber, blue, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow } from '@mui/material/colors';
import { SnackbarProvider } from 'notistack';

declare module '@mui/material/styles' {
  interface PaletteColor {
    lighter?: string;
		extraLight?: string;
  }

  interface SimplePaletteColorOptions {
    lighter?: string;
		extraLight?: string;
  }
}

type BlackType = {500: string, 600: string};

type ColorsType = typeof red|typeof pink|typeof purple|typeof deepPurple|typeof indigo|typeof blue|typeof lightBlue|typeof cyan|typeof teal|typeof green|typeof lightGreen|typeof lime|typeof yellow|typeof amber|typeof orange|typeof deepOrange|typeof grey|BlackType;

export default function Theme({
  children,
	profileColor,
}: Readonly<{
  children: React.ReactNode
	profileColor: string,
}>) {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const supabase = createClient();
  const [colorLabel, setColorLabel] = React.useState<string | null>(profileColor||null);
  const [color, setColor] = React.useState<ColorsType>(grey);
	const black = {500: '#111', 600: '#f5f5f5'};

	React.useEffect(() => {
		switch (colorLabel) {
			case 'red':
				setColor(red);
				break;
			case 'pink':
				setColor(pink);
				break;
			case 'purple':
				setColor(purple);
				break;
			case 'deep purple':
				setColor(deepPurple);
				break;
			case 'indigo':
				setColor(indigo);
				break;
			case 'blue':
				setColor(blue);
				break;
			case 'light blue':
				setColor(lightBlue);
				break;
			case 'cyan':
				setColor(cyan);
				break;
			case 'teal':
				setColor(teal);
				break;
			case 'green':
				setColor(green);
				break;
			case 'light green':
				setColor(lightGreen);
				break;
			case 'lime':
				setColor(lime);
				break;
			case 'yellow':
				setColor(yellow);
				break;
			case 'amber':
				setColor(amber);
				break;
			case 'orange':
				setColor(orange);
				break;
			case 'deep orange':
				setColor(deepOrange);
				break;
			case 'grey':
				setColor(grey);
				break;
			case 'black/white':
				setColor(black);
				break;
			default:
				setColor(grey);
				break;
		}
	}, [colorLabel]);

	// const getProfile = React.useCallback(async () => {
	// 	const {
	// 		data: { user },
	// 	} = await supabase.auth.getUser();

  //   try {
  //     const { data } = await supabase
  //       .from('profiles')
  //       .select(`full_name, username, avatar_url, color`)
  //       .eq('id', user?.id)
  //       .single();

  //     if (data) {
  //       setColorLabel(data.color);
  //     }
  //   } catch (error) {
  //     alert('Error loading user data!');
  //   }
  // }, [supabase]);

  // React.useEffect(() => {
  //   getProfile();
  // }, [getProfile]);

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
						main: purple[500],
					},
				},
			}),
		[prefersDarkMode, color],
	);

	React.useEffect(() => {
		const channel = supabase.channel('realtime profile')
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
