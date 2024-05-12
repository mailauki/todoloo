'use client';
import React from 'react';
import type { Todo } from '@/app/_utils/types';
import { CheckCircle, CheckCircleOutline, MoreVert } from '@mui/icons-material';
import { Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import { toggleTodo } from './actions';
import moment from 'moment';
import TodoMenu from './todo-menu';
import { useOpen } from '@/app/_utils/context';

export default function ToDo({ todo }: { todo: Todo }) {
	const { setAnchor, setSelectedTodo } = useOpen();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
		setSelectedTodo(todo);
  };

	return (
		<>
			<Paper
				component={ListItem}
				secondaryAction={
					<IconButton onClick={handleClick}>
						<MoreVert />
					</IconButton>
				}
				sx={{
					padding: 0,
					marginBottom: 2,
					overflow: 'hidden',
					backgroundColor: todo.is_complete ? 'card.paper' : 'card.done',
					'& .MuiListItemSecondaryAction-root': { right: 2 },
				}}
				variant='outlined'
			>
				<ListItemButton dense onClick={() => toggleTodo(todo)}>
					<ListItemIcon>
						<Checkbox
							checked={todo.is_complete}
							checkedIcon={<CheckCircle />}
							color='default'
							disableRipple
							edge='start'
							icon={<CheckCircleOutline />}
							sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
							tabIndex={-1}
						/>
					</ListItemIcon>
					<ListItemText
						primary={todo.task}
						secondary={
							todo.show_dates && (
								<Typography id='due-date' variant='caption'>
									{moment(todo.due_date).format('dddd, MMM D')}
								</Typography>
							)
						}
						sx={{
							'& span': {
								color: todo.is_complete ? 'text.disabled' : 'text.primary',
								textDecoration: todo.is_complete ? 'line-through' : 'none',
							},
							'& #due-date': {
								color: todo.is_complete ? 'text.disabled' : 'text.secondary',
								textDecoration: todo.is_complete ? 'line-through' : 'none',
							},
						}}
					/>
				</ListItemButton>
			</Paper>

			<TodoMenu />
		</>
	);
}
