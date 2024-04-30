'use client';

import * as React from 'react';

import { ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import { createClient } from './supabase/client';
import { blue } from '@mui/material/colors';

export default function Theme({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const supabase = createClient();
  const [color, setColor] = React.useState<string | null>(null);

	const getProfile = React.useCallback(async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();

    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, avatar_url, color`)
        .eq('id', user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setColor(data.color);
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
						main: color! || blue[500],
					},
					// background: {
					// 	paper: ,
					// },
				},
				// components: {
				// 	MuiPaper: {
				// 		defaultProps: {
				// 			sx: {
				// 				backgroundColor: color!,
				// 			},
				// 		},
				// 	},
				// },
			}),
		[prefersDarkMode, color],
	);

	return (
		<ThemeProvider theme={theme}>{children}</ThemeProvider>
	);
}
