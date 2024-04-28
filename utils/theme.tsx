'use client';

import * as React from 'react';

import { ThemeProvider, createTheme, useMediaQuery } from '@mui/material';

export default function Theme({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	const theme = React.useMemo(
		() =>
			createTheme({
				palette: {
					mode: prefersDarkMode ? 'dark' : 'light',
				},
			}),
		[prefersDarkMode],
	);

	return (
		<ThemeProvider theme={theme}>{children}</ThemeProvider>
	);
}
