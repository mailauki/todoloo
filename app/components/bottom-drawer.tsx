import { Container, Drawer, Toolbar } from '@mui/material';

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
			sx={{
				zIndex: (theme) => theme.zIndex.fab - 1,
			}}
		>
			<Container maxWidth='sm' sx={{ my: 2 }}>
				{children}
				<Toolbar sx={{ mt: 6 }} />
			</Container>
		</Drawer>
	);
}
