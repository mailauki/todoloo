'use client';
import { AccountCircle, ChevronLeft } from '@mui/icons-material';
import { AppBar, Link as Anchor, Toolbar, IconButton } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
	const pathname = usePathname();

	return (
		<AppBar
			// color='inherit'
			elevation={0}
			// sx={{ backgroundColor: 'primary.light' }}
			sx={{ backgroundColor: 'transparent' }}
		>
			<Toolbar
				sx={{
					display: 'flex',
					// justifyContent: 'center',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<IconButton
					color='inherit'
					component={Link}
					href='/'
					sx={{ visibility: pathname === '/' ? 'hidden' : 'inherit' }}
				>
					<ChevronLeft />
				</IconButton>

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
					sx={{ visibility: pathname === '/account' ? 'hidden' : 'inherit' }}
				>
					<AccountCircle />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
}
