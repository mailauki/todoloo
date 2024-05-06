'use client';
import { Container, Drawer, IconButton, Toolbar } from '@mui/material';
import AddTodo from './add-todo';
import { Close } from '@mui/icons-material';

export default function TodoForm({
	open,
	handleClose,
}: {
	open: boolean,
	handleClose: () => void,
}) {
  // const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<>
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
					<AddTodo />
					<Toolbar sx={{ mt: 6 }} />
				</Container>
			</Drawer>
		</>
	);
}
