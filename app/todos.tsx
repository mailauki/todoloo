'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
// import { cookies } from 'next/headers';
import type { Session } from '@supabase/supabase-js';
import { AppBar, Container, IconButton, InputAdornment, List, ListItem, ListItemText, TextField, Toolbar } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import type { Todo } from '@/utils/types';

export default function Todos({ session }: { session: Session }) {
  // const cookieStore = cookies();
  const supabase = createClient();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  const user = session.user;

	useEffect(() => {
    const fetchTodos = async () => {
      const { data: todos, error } = await supabase
        .from('todos')
        .select('*')
        .order('id', { ascending: true });

      if (error) console.log('error', error);
      else setTodos(todos);
    };

    fetchTodos();
  }, [supabase]);

	const addTodo = async (taskText: string) => {
    const task = taskText.trim();
    if (task.length) {
      const { data: todo, error } = await supabase
        .from('todos')
        .insert({ task, user_id: user.id })
        .select()
        .single();

      if (error) {
        console.log(error.message);
      } else {
        setTodos([...todos, todo]);
        setNewTaskText('');
      }
    }
  };

	const deleteTodo = async (id: number) => {
    try {
      await supabase.from('todos').delete().match({ id: id, user_id: user.id }).throwOnError();
      setTodos(todos.filter((x) => x.id != id));
    } catch (error) {
      console.log('error', error);
    }
  };

	return (
		<>
			<List sx={{ width: '100%' }}>
				{todos?.map((todo) => (
					<ListItem
					key={todo.id}
					secondaryAction={
						<IconButton
							aria-label='delete'
							edge='end'
							onClick={() => deleteTodo(todo.id)}
						>
							<Delete />
						</IconButton>
					}
					>
						<ListItemText primary={todo.task} />
					</ListItem>
				))}
			</List>

			<AppBar
				color='inherit'
				component='form'
				elevation={0}
        onSubmit={(event) => {
          event.preventDefault();
          addTodo(newTaskText);
        }}
				position='fixed'
				square
				sx={{
					width: '100%',
					top: 'auto',
					bottom: 64,
					zIndex: (theme) => theme.zIndex.appBar - 1,
					pb: 2,
					mb: -2,
				}}
			>
				<Toolbar disableGutters sx={{ justifyContent: 'center', alignItems: 'center' }}>
					<Container maxWidth='xs'>
						<TextField
							InputProps={{
								endAdornment: <InputAdornment position='end'>
									<IconButton size='small' type='submit'>
										<Add fontSize='small' />
									</IconButton>
								</InputAdornment>,
							}}
							fullWidth
							label='Add New Todo'
							margin='normal'
							onChange={(e) => {
								setNewTaskText(e.target.value);
							}}
							size='small'
							type='text'
							value={newTaskText}
						/>
					</Container>
				</Toolbar>
			</AppBar>
		</>
	);
}
