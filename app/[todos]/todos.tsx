'use client';
import * as React from 'react';
import type { Todo } from '@/utils/types';
import { createClient } from '@/utils/supabase/client';
import { List } from '@mui/material';
import ToDo from './todo';

export default function Todos({serverTodos}: {serverTodos: Todo[]}) {
  const supabase = createClient();
	const [todos, setTodos] = React.useState(serverTodos);

	React.useEffect(() => {
		const channel = supabase.channel('realtime todos')
		.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'todos' }, (payload) => setTodos([...todos, payload.new as Todo]))
		.on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'todos' }, (payload) => setTodos(todos.filter((x) => x.id != payload.old.id)))
		.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [supabase, todos, setTodos]);

	return (
		<>
			<List sx={{ width: '100%' }}>
				{todos?.map((todo) => (
					<ToDo key={todo.id} serverTodo={todo} />
				))}
			</List>
		</>
	);
}
