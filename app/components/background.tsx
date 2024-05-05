'use client';
import { Paper, Toolbar, alpha, useTheme } from '@mui/material';

export default function Background() {
	const theme = useTheme();

	return (
		<Paper
			elevation={0}
			square
			sx={{
				background: `linear-gradient(to top, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0.5)} 20%, ${alpha(theme.palette.primary.main, 0.3)} 30%, ${alpha(theme.palette.primary.main, 0.2)} 40%, ${alpha(theme.palette.primary.main, 0.1)} 50%, ${alpha(theme.palette.primary.main, 0.05)} 70%, `+'rgba(0,0,0,0) 100%)',
				position: 'fixed',
				bottom: 0,
				height: '300px',
				width: '100%',
				zIndex: -1,
			}}
		>
			<Toolbar />
		</Paper>
	);
}
