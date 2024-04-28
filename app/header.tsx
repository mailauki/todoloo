// import { Login, Logout } from '@mui/icons-material';
import { AppBar, Link as Anchor, Toolbar } from '@mui/material';
// import type { Session } from '@supabase/supabase-js';
import Link from 'next/link';

export default function Header(/* { session }: { session: Session | null } */) {
	return (
		<AppBar
			color='inherit'
			elevation={3}
			variant='outlined'
		>
			<Toolbar
				sx={{
					display: 'flex',
					// justifyContent: 'space-between',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Anchor
					color='inherit'
					component={Link}
					href='/'
					underline='none'
					variant='h5'
				>
					ToDoLoo
				</Anchor>

				{/* {!session ? (
					<Tooltip title='Login'>
						<IconButton component={Link} href='/login'>
							<Login />
						</IconButton>
					</Tooltip>
				) : (
					<form action='/auth/signout' method='post'>
						<Tooltip title='Signout'>
							<IconButton type='submit'>
								<Logout />
							</IconButton>
						</Tooltip>
					</form>
				)} */}
			</Toolbar>
		</AppBar>
	);
}
