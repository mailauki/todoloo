import { Close } from '@mui/icons-material';
import { Container, Drawer, IconButton, Toolbar } from '@mui/material';

export default function BottomDrawer({
	children,
	open,
	handleClose,
}: Readonly<{
  children: React.ReactNode,
	open: boolean,
	handleClose: () => void,
}>) {
	return (
		<Drawer
			anchor='bottom'
			onClose={handleClose}
			open={open}
		>
			<Container maxWidth='sm'  sx={{ my: 1 }}>
				<Toolbar disableGutters sx={{ justifyContent: 'flex-end' }}>
					<IconButton
						aria-label='close'
						onClick={handleClose}
					>
						<Close />
					</IconButton>
				</Toolbar>
				{children}
				<Toolbar sx={{ mt: 6 }} />
			</Container>
		</Drawer>
	);
}
