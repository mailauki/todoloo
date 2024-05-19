'use client';
import { AccountCircle, ChevronLeft } from '@mui/icons-material';
import { AppBar, Link as Anchor, Toolbar, IconButton, Typography, useScrollTrigger, alpha, useTheme } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
	const pathname = usePathname();
	const theme = useTheme();
	const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

	return (
		<AppBar
			elevation={0}
			position='fixed'
			sx={{
				backgroundColor: trigger ? alpha('#000', 0.4) : 'transparent',
				backdropFilter: 'blur(10px)',
				transition: theme.transitions.create(['display', 'background-color'], {
					easing: theme.transitions.easing.easeInOut,
					duration: theme.transitions.duration.standard,
				}),
			}}
		>
			{pathname !== '/login' ? (
				<Toolbar
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					{pathname.split('/')[1] === 'update' ? (
						<IconButton
							color='inherit'
							component={Link}
							href='/account'
						>
							<ChevronLeft />
						</IconButton>
					) : (
						<IconButton
							color='inherit'
							component={Link}
							href='/'
							sx={{ visibility: pathname === '/' ? 'hidden' : 'inherit' }}
						>
							<ChevronLeft />
						</IconButton>
					)}

					<Anchor
						color='inherit'
						component={Link}
						href={pathname === '/account' ? '/account' : '/'}
						underline='none'
						variant='h5'
					>
						{pathname === '/account' ? 'Profile' : 'ToDoLoo'}
					</Anchor>

					<IconButton
						color='inherit'
						component={Link}
						href='/account'
						sx={{ visibility: pathname === '/account' || pathname.split('/')[1] === 'update' ? 'hidden' : 'inherit' }}
					>
						<AccountCircle />
					</IconButton>
				</Toolbar>
			) : (
				<Toolbar
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Typography variant='h5'>ToDoLoo</Typography>
				</Toolbar>
			)}
		</AppBar>
	);
}
