'use client';
import React from 'react';
import type { Todo } from '@/utils/types';
import { MoreVert } from '@mui/icons-material';
import { Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, Typography, alpha } from '@mui/material';
import { createClient } from '@/utils/supabase/client';
import { toggleTodo } from './actions';
import moment from 'moment';
import TodoMenu from './todo-menu';

export default function ToDo({ serverTodo }: { serverTodo: Todo }) {
  const supabase = createClient();
	const [todo, setTodo] = React.useState(serverTodo);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

	React.useEffect(() => {
		const channel = supabase.channel('realtime todo')
		.on('postgres_changes', {
			event: 'UPDATE',
			schema: 'public',
			table: 'todos',
			filter: `id=eq.${todo.id}`,
		}, (payload) => setTodo(payload.new as Todo))
		.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [supabase, todo, setTodo]);

	return (
		<>
			<Paper
				component={ListItem}
				secondaryAction={
					<Stack alignItems='center' direction='row' spacing={0.5}>
						<Typography id='due-date' variant='caption'>
							{moment(todo.due_date).format('dddd, MMM D')}
						</Typography>
						<IconButton onClick={handleClick}>
							<MoreVert />
						</IconButton>
					</Stack>
				}
				sx={{
					padding: 0,
					marginBottom: 2,
					overflow: 'hidden',
					backgroundColor: (theme) => todo.is_complete ? alpha(theme.palette.background.paper, 0.2) : alpha(theme.palette.background.paper, 0.45),
					'& #due-date': {
						color: todo.is_complete ? 'text.disabled' : 'text.secondary',
						display: 'none',
					},
					'&:hover #due-date': { display: 'block' },
					'& .MuiListItemSecondaryAction-root': { right: 2 },
				}}
				variant='outlined'
			>
				<ListItemButton dense onClick={() => toggleTodo(todo)} role={undefined}>
					<ListItemIcon>
						<Checkbox
							checked={todo.is_complete}
							disableRipple
							edge='start'
							tabIndex={-1}
						/>
					</ListItemIcon>
					<ListItemText
						primary={todo.task}
						sx={{
							textDecoration: todo.is_complete ? 'line-through' : 'none',
							color: todo.is_complete ? 'text.disabled' : 'text.primary',
						}}
					/>
				</ListItemButton>
			</Paper>

			<TodoMenu
				anchor={anchorEl}
				handleClose={handleClose}
				open={open}
				todo={todo}
			/>
		</>
	);
}
