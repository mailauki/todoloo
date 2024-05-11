'use client';
import { Paper, Toolbar, alpha, useTheme } from '@mui/material';

export default function Background() {
	const theme = useTheme();

	const gradient = `radial-gradient(18% 28% at 24% 50%, ${alpha(theme.palette.tertiary.main, 0.15)} 7%, ${alpha(theme.palette.primary.main, 0)} 100%),radial-gradient(18% 28% at 18% 71%, ${alpha(theme.palette.background.paper, 0.35)} 6%, ${alpha(theme.palette.primary.main, 0)} 100%),radial-gradient(70% 53% at 36% 76%, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.primary.main, 0)} 100%),radial-gradient(42% 53% at 15% 94%, ${alpha(theme.palette.background.paper, 0.5)} 7%, ${alpha(theme.palette.primary.main, 0)} 100%),radial-gradient(42% 53% at 34% 72%, ${alpha(theme.palette.background.paper, 0.61)} 7%, ${alpha(theme.palette.primary.main, 0)} 100%),radial-gradient(18% 28% at 35% 87%, ${alpha(theme.palette.background.paper, 0.35)} 7%, ${alpha(theme.palette.primary.main, 0)} 100%),radial-gradient(31% 43% at 7% 98%, ${alpha(theme.palette.background.paper, 0.96)} 24%, ${alpha(theme.palette.primary.main, 0)} 100%),radial-gradient(21% 37% at 72% 23%, ${alpha(theme.palette.secondary.main, 0.61)} 24%, ${alpha(theme.palette.primary.main, 0)} 100%),radial-gradient(35% 56% at 91% 74%, ${alpha(theme.palette.primary.main, 0.96)} 9%, ${alpha(theme.palette.primary.main, 0)} 100%),radial-gradient(74% 86% at 67% 38%, ${alpha(theme.palette.secondary.main, 0.56)} 24%, ${alpha(theme.palette.primary.main, 0)} 100%),linear-gradient(125deg, ${theme.palette.tertiary.main} 1%, ${theme.palette.primary.main} 100%)`;

	return (
		<Paper
			elevation={0}
			square
			sx={{
				background: gradient,
				position: 'fixed',
				bottom: 0,
				left: 'auto',
				right: 'auto',
				height: '100%',
				width: '100%',
				minWidth: '600px',
				zIndex: -1,
			}}
		>
			<Toolbar />
		</Paper>
	);
}
