'use client';
import { Paper, Toolbar, useTheme } from '@mui/material';

export default function Background() {
	const theme = useTheme();

	return (
		<Paper
			elevation={0}
			square
			sx={{
				background: `linear-gradient(${theme.palette.primary.main}, rgba(0,0,0,0));`,
				position: 'fixed',
				top: 0,
				height: '200px',
				width: '100%',
				zIndex: -1,
			}}
		>
			<Toolbar />
		</Paper>
	);
}
