'use client';
import { Paper, Toolbar, alpha, useTheme } from '@mui/material';

export default function Background() {
	const theme = useTheme();

	return (
		<Paper
			elevation={0}
			square
			sx={{
				// background: `linear-gradient(to top, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0.5)} 20%, ${alpha(theme.palette.primary.main, 0.3)} 30%, ${alpha(theme.palette.primary.main, 0.2)} 40%, ${alpha(theme.palette.primary.main, 0.1)} 50%, ${alpha(theme.palette.primary.main, 0.05)} 70%, `+'rgba(0,0,0,0) 100%)',
				background: `radial-gradient(18% 28% at 24% 50%, ${alpha(theme.palette.secondary.main, 0.15)} 7%, ${alpha(theme.palette.primary.main, 0)} 100%),radial-gradient(18% 28% at 18% 71%, ${alpha(theme.palette.background.paper, 0.35)} 6%, ${alpha(theme.palette.primary.main, 0)} 100%),radial-gradient(70% 53% at 36% 76%, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.primary.main, 0)} 100%),radial-gradient(42% 53% at 15% 94%, ${alpha(theme.palette.background.paper, 0.5)} 7%, ${alpha(theme.palette.primary.main, 0)} 100%),radial-gradient(42% 53% at 34% 72%, ${alpha(theme.palette.background.paper, 0.61)} 7%, ${alpha(theme.palette.primary.main, 0)} 100%),radial-gradient(18% 28% at 35% 87%, ${alpha(theme.palette.background.paper, 0.35)} 7%, ${alpha(theme.palette.primary.main, 0)} 100%),radial-gradient(31% 43% at 7% 98%, ${alpha(theme.palette.background.paper, 0.96)} 24%, ${alpha(theme.palette.primary.main, 0)} 100%),radial-gradient(21% 37% at 72% 23%, ${alpha(theme.palette.warning.main, 0.61)} 24%, ${alpha(theme.palette.primary.main, 0)} 100%),radial-gradient(35% 56% at 91% 74%, ${alpha(theme.palette.primary.main, 0.96)} 9%, ${alpha(theme.palette.primary.main, 0)} 100%),radial-gradient(74% 86% at 67% 38%, ${alpha(theme.palette.warning.main, 0.56)} 24%, ${alpha(theme.palette.primary.main, 0)} 100%),linear-gradient(125deg, ${theme.palette.secondary.main} 1%, ${theme.palette.primary.main} 100%)`,
				position: 'fixed',
				bottom: 0,
				// height: '300px',
				height: '100%',
				width: '100%',
				zIndex: -1,
			}}
		>
			<Toolbar />
		</Paper>
	);
}
