'use client';
import React from 'react';
import type { Todo } from '@/utils/types';
import { Delete } from '@mui/icons-material';
import { Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, alpha } from '@mui/material';
import { createClient } from '@/utils/supabase/client';
import { deleteTodo, toggleTodo } from './actions';

export default function ToDo({serverTodo}: {serverTodo: Todo}) {
  const supabase = createClient();
	const [todo, setTodo] = React.useState(serverTodo);

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
		<Paper
			component={ListItem}
			secondaryAction={
				<IconButton
					aria-label='delete'
					edge='end'
					onClick={() => deleteTodo(todo.id)}
				>
					<Delete />
				</IconButton>
			}
			sx={{
				padding: 0,
				marginBottom: 2,
				overflow: 'hidden',
				backgroundColor: (theme) => todo.is_complete ? alpha(theme.palette.background.paper, 0.2) : alpha(theme.palette.background.paper, 0.45),
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
	);
}
