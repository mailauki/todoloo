'use client';
import { useOpen } from '@/app/_utils/context';
import { AccountCircle, ChevronLeft } from '@mui/icons-material';
import { AppBar, Link as Anchor, Toolbar, IconButton } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
	const pathname = usePathname();
	const { openProfileUpdate, setOpenProfileUpdate, openProfileColor, setOpenProfileColor, openProfileSettings, setOpenProfileSettings } = useOpen();

	return (
		<AppBar
			// color='inherit'
			elevation={0}
			position='fixed'
			// sx={{ backgroundColor: 'primary.light' }}
			sx={{ backgroundColor: 'transparent' }}
		>
			<Toolbar
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				{openProfileUpdate||openProfileColor||openProfileSettings ? (
					<IconButton
						color='inherit'
						onClick={() => {
							if (openProfileUpdate) setOpenProfileUpdate(false);
							else if (openProfileColor) setOpenProfileColor(false);
							else if (openProfileSettings) setOpenProfileSettings(false);
						}}
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
					sx={{ visibility: pathname === '/account' ? 'hidden' : 'inherit' }}
				>
					<AccountCircle />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
}
