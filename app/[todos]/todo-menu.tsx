import { Delete, Edit } from '@mui/icons-material';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { deleteTodo } from './actions';
import React from 'react';
import { useOpen } from '@/utils/context';

export default function TodoMenu() {
	const { anchor, openTodoMenu, handleCloseMenu, selectedTodo, setOpenTodoEdit } = useOpen();

	return (
		<Menu
			anchorEl={anchor}
			onClose={handleCloseMenu}
			open={openTodoMenu}
		>
			<MenuItem
				aria-label='edit'
				id='edit-task'
				onClick={() => {
					handleCloseMenu();
					console.log(selectedTodo!.id);
					setOpenTodoEdit(true);
				}}
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
					handleCloseMenu();
					deleteTodo(selectedTodo!.id);
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
