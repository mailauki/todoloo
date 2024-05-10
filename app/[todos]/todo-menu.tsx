import type { Todo } from '@/utils/types';
import { Delete, Edit } from '@mui/icons-material';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { deleteTodo } from './actions';
import BottomDrawer from '../components/bottom-drawer';
import EditTodo from './edit-todo';
import React from 'react';

export default function TodoMenu({
	openMenu, anchor, handleCloseMenu, todo,
}: {
	openMenu: boolean,
	anchor: HTMLElement|null,
	handleCloseMenu: () => void,
	todo: Todo,
}) {
	const [openEdit, setOpenEdit] = React.useState(false);
	const handleCloseEdit = () => setOpenEdit(false);

	return (
		<>
			<Menu
				anchorEl={anchor}
				onClose={handleCloseMenu}
				open={openMenu}
			>
				<MenuItem
					aria-label='edit'
					id='edit-task'
					onClick={() => {
						handleCloseMenu();
						console.log(todo.id);
						setOpenEdit(true);
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

			<BottomDrawer handleClose={handleCloseEdit} open={openEdit}>
				<EditTodo handleCloseEdit={handleCloseEdit} todo={todo} />
			</BottomDrawer>
		</>
	);
}
