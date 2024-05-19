'use client';
import React from 'react';
import type { Todo } from '@/app/_utils/types';
import { createClient } from '@/app/_utils/supabase/client';
import { Chip, List, Stack, Typography } from '@mui/material';
import ToDo from './todo';
import moment from 'moment';
import Welcome from '../_components/welcome';

export default function Todos({
	serverTodos,
}: {
	serverTodos: Todo[],
}) {
  const supabase = createClient();
	const [todos, setTodos] = React.useState(serverTodos);
	const today = moment().format('YYYY-MM-DD');
	const todosDueToday = todos?.filter((todo) => todo.due_date === today);
	const todosPastDue = todos?.filter((todo) => todo.due_date !== today && moment().diff(todo.due_date) > 0);
	const todosDueLater = todos?.filter((todo) => todo.due_date !== today && moment().diff(todo.due_date) < 0);
	const doneTodosDueToday = todosDueToday?.filter((todo) => todo.is_complete);
	const doneTodosPastDue = todosPastDue?.filter((todo) => todo.is_complete);
	const doneTodosDueLater = todosDueLater?.filter((todo) => todo.is_complete);

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
		.on('postgres_changes', {
			event: 'UPDATE',
			schema: 'public',
			table: 'settings',
		}, (payload) => setTodos(todos!.map((todo) => Object.assign(todo, {show_dates: payload.new.show_dates as boolean}))))
		.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [supabase, todos, setTodos]);

	if (!todos || (todosDueToday.length < 0 && todosPastDue.length < 0 && todosDueLater.length < 0)) return <Typography variant='h6'>No Tasks</Typography>;

	console.log({todosDueToday});

	return (
		<>
			<Welcome />

			{todosDueToday && todosDueToday.length > 0 && (
				<List
					subheader={
						<Stack
							alignItems='center'
							direction='row'
							justifyContent='space-between'
							sx={{ mb: 1 }}
						>
						<Typography
							color='text.secondary'
							variant='h6'
						>
							Due Today
						</Typography>
						<Chip
							label={`${doneTodosDueToday.length} / ${todosDueToday.length}`}
						/>
						</Stack>
					}
					sx={{ width: '100%' }}
				>
					{todosDueToday.map((todo) => (
						<ToDo key={todo.id} todo={todo} />
					))}
				</List>
			)}

			{todosPastDue && todosPastDue.length > 0 && (
				<List
					subheader={
						<Stack
							alignItems='center'
							direction='row'
							justifyContent='space-between'
							sx={{ mb: 1 }}
						>
						<Typography
							color='text.secondary'
							variant='h6'
						>
							Past Due
						</Typography>
						<Chip
							label={`${doneTodosPastDue.length} / ${todosPastDue.length}`}
						/>
						</Stack>
					}
					sx={{ width: '100%' }}
				>
					{todosPastDue.map((todo) => (
						<ToDo key={todo.id} todo={todo} />
					))}
				</List>
			)}

			{todosDueLater && todosDueLater.length > 0 && (
				<List
					subheader={
						<Stack
							alignItems='center'
							direction='row'
							justifyContent='space-between'
							sx={{ mb: 1 }}
						>
						<Typography
							color='text.secondary'
							variant='h6'
						>
							Due Later
						</Typography>
						<Chip
							label={`${doneTodosDueLater.length} / ${todosDueLater.length}`}
						/>
						</Stack>
					}
					sx={{ width: '100%' }}
				>
					{todosDueLater.map((todo) => (
						<ToDo key={todo.id} todo={todo} />
					))}
				</List>
			)}
		</>
	);
}
