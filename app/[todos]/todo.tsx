import * as React from 'react';
import type { Todo } from '@/utils/types';
import { Delete } from '@mui/icons-material';
import { Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { createClient } from '@/utils/supabase/client';

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

	const toggleTodo = async (todo: Todo) => {
		const { error } = await supabase
		.from('todos')
		.update({ is_complete: !todo.is_complete })
		.eq('id', todo.id);

		if (error) {
			console.log(error.message);
		}
  };

	return (
		<ListItem
			secondaryAction={
				<IconButton
					aria-label='delete'
					edge='end'
				>
					<Delete />
				</IconButton>
			}
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
				<ListItemText primary={todo.task} />
			</ListItemButton>
		</ListItem>
	);
}
