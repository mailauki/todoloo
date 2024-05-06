import type { Todo } from '@/utils/types';
import { Delete, Edit } from '@mui/icons-material';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { deleteTodo } from './actions';

export default function TodoMenu({
	open, anchor, handleClose, todo,
}: {
	open: boolean,
	anchor: HTMLElement|null,
	handleClose: () => void,
	todo: Todo,
}) {
	return (
		<Menu
			anchorEl={anchor}
			onClose={handleClose}
			open={open}
		>
			<MenuItem
				aria-label='edit'
				id='edit-task'
				onClick={handleClose}
			>
				<ListItemIcon>
					<Edit fontSize='small' />
				</ListItemIcon>
				<ListItemText primary='Edit task' />
			</MenuItem>
			<MenuItem
				aria-label='delete'
				id='delete-task'
				onClick={() => {
					handleClose();
					deleteTodo(todo.id);
				}}
			>
				<ListItemIcon>
					<Delete color='error' fontSize='small' />
				</ListItemIcon>
				<ListItemText
					primary='Delete task'
					primaryTypographyProps={{
						color: 'error',
					}}
				/>
			</MenuItem>
		</Menu>
	);
}
