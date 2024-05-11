'use client';
import React from 'react';
import type { Todo } from '@/app/_utils/types';
import { createClient } from '@/app/_utils/supabase/client';
import { List, Typography } from '@mui/material';
import ToDo from './todo';
import moment from 'moment';

export default function Todos({ serverTodos }: { serverTodos: Todo[] }) {
  const supabase = createClient();
	const [todos, setTodos] = React.useState(serverTodos);
	const today = moment().format('YYYY-MM-DD');
	const todosDueToday = todos?.filter((todo) => todo.due_date === today);
	const todosPastDue = todos?.filter((todo) => todo.due_date !== today && moment().diff(todo.due_date) > 0);
	const todosDueLater = todos?.filter((todo) => todo.due_date !== today && moment().diff(todo.due_date) < 0);

	React.useEffect(() => {
		const channel = supabase.channel('realtime todos')
		.on('postgres_changes', {
			event: 'INSERT', schema: 'public', table: 'todos',
		}, (payload) => setTodos([...todos, payload.new as Todo]))
		.on('postgres_changes', {
			event: 'DELETE', schema: 'public', table: 'todos',
		}, (payload) => setTodos(todos.filter((newTodo) => newTodo.id != payload.old.id)))
		.on('postgres_changes', {
			event: 'UPDATE', schema: 'public', table: 'todos',
		}, (payload) => {
			console.log(payload);
			console.log((todos.map((newTodo) => newTodo.id == payload.old.id ? payload.new : newTodo)));
			setTodos(todos.map((newTodo) => newTodo.id == payload.old.id ? payload.new as Todo : newTodo));
		})
		.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [supabase, todos, setTodos]);

	if (!todos || (todosDueToday.length < 0 && todosPastDue.length < 0 && todosDueLater.length < 0)) return <Typography variant='h6'>No Tasks</Typography>;

	return (
		<>
			{todosDueToday && todosDueToday.length > 0 && (
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
			)}

			{todosPastDue && todosPastDue.length > 0 && (
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
			)}

			{todosDueLater && todosDueLater.length > 0 && (
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
			)}
		</>
	);
}
