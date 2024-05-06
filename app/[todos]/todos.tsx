'use client';
import React from 'react';
import type { Todo } from '@/utils/types';
import { createClient } from '@/utils/supabase/client';
import { List, Typography } from '@mui/material';
import ToDo from './todo';
import moment from 'moment';

export default function Todos({ serverTodos }: { serverTodos: Todo[] }) {
  const supabase = createClient();
	const [todos, setTodos] = React.useState(serverTodos);
	const today = new Date().toISOString().substring(0, 10);
	const todosDueToday = todos?.filter((todo) => todo.due_date === today);
	const todosPastDue = todos?.filter((todo) => todo.due_date !== today && moment().diff(todo.due_date) > 0);
	const todosDueLater = todos?.filter((todo) => moment().diff(todo.due_date) < 0);

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
			<List
				subheader={
					<Typography
						color='background.paper'
						sx={{ mb: 1 }}
						variant='h6'
					>
						Due Today
					</Typography>
				}
				sx={{ width: '100%' }}
			>
				{todosDueToday.map((todo) => (
					<ToDo key={todo.id} serverTodo={todo} />
				))}
			</List>
			<List
				subheader={
					<Typography
						color='background.paper'
						sx={{ mb: 1 }}
						variant='h6'
					>
						Past Due
					</Typography>
				}
				sx={{ width: '100%' }}
			>
				{todosPastDue.map((todo) => (
					<ToDo key={todo.id} serverTodo={todo} />
				))}
			</List>
			<List
				subheader={
					<Typography
						color='background.paper'
						sx={{ mb: 1 }}
						variant='h6'
					>
						Due Later
					</Typography>
				}
				sx={{ width: '100%' }}
			>
				{todosDueLater.map((todo) => (
					<ToDo key={todo.id} serverTodo={todo} />
				))}
			</List>
		</>
	);
}
