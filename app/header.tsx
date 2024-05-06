import { AppBar, Link as Anchor, Toolbar } from '@mui/material';
import Link from 'next/link';

export default function Header() {
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
			</Toolbar>
		</AppBar>
	);
}
