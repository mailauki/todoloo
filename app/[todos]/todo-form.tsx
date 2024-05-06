'use client';
import { Close } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle, IconButton, useMediaQuery, useTheme } from '@mui/material';
import AddTodo from './add-todo';

export default function TodoForm({
	open,
	handleClose,
}: {
	open: boolean,
	handleClose: () => void,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<>
			<Dialog
        fullScreen={fullScreen}
				fullWidth
				maxWidth='xs'
				onClose={handleClose}
				open={open}
			>
				<DialogTitle>Edit Todo</DialogTitle>
				<IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
				<DialogContent>
					<AddTodo />
				</DialogContent>
			</Dialog>
		</>
	);
}