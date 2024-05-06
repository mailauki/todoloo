'use client';
import React from 'react';
import { ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import { createClient } from './supabase/client';
import { amber, blue, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow } from '@mui/material/colors';

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

type ColorsType = typeof red|typeof pink|typeof purple|typeof deepPurple|typeof indigo|typeof blue|typeof lightBlue|typeof cyan|typeof teal|typeof green|typeof lightGreen|typeof lime|typeof yellow|typeof amber|typeof orange|typeof deepOrange|typeof grey;

export default function Theme({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const supabase = createClient();
  const [colorLabel, setColorLabel] = React.useState<string | null>(null);
  const [color, setColor] = React.useState<ColorsType>(grey);

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
			default:
				setColor(grey);
				break;
		}
	}, [colorLabel]);

	const getProfile = React.useCallback(async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();

    try {
      const { data } = await supabase
        .from('profiles')
        .select(`full_name, username, avatar_url, color`)
        .eq('id', user?.id)
        .single();

      if (data) {
        setColorLabel(data.color);
      }
    } catch (error) {
      alert('Error loading user data!');
    }
  }, [supabase]);

  React.useEffect(() => {
    getProfile();
  }, [getProfile]);

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

	return (
		<ThemeProvider theme={theme}>{children}</ThemeProvider>
	);
}
