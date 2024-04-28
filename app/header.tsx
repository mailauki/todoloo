import { Logout } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';

export default function Header() {
	return (
		<AppBar
			color='default'
			elevation={1}
			variant='outlined'
		>
			<Toolbar
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Typography variant='h5'>
					ToDoLoo
				</Typography>
			</Toolbar>
			<Toolbar
				sx={{
					display: 'flex',
					justifyContent: 'flex-end',
					alignItems: 'center',
					position: 'absolute',
					width: 'calc(100% - 48px)',
				}}
			>
				<Tooltip title='Signout'>
					<IconButton>
						<Logout />
					</IconButton>
				</Tooltip>
			</Toolbar>
		</AppBar>
	);
}
