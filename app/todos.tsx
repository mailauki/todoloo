'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
// import { cookies } from 'next/headers';
import type { Session } from '@supabase/supabase-js';
import type { UUID } from 'crypto';
import { Button, IconButton, List, ListItem, ListItemText, Stack, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Todo {
	id: number,
	user_id: UUID,
	task: string,
	created_at: Date,
}

export default function Todos({ session }: { session: Session }) {
  // const cookieStore = cookies();
  const supabase = createClient();
  // const { data: todos } = await supabase.from('todos').select();
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
			<Stack
				component='form'
				direction='column'
        onSubmit={(e) => {
          e.preventDefault();
          addTodo(newTaskText);
        }}
				sx={{ width: '100%' }}
			>
				<TextField
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
				<Button
					fullWidth
					type='submit'
					variant='outlined'
				>
          Add
        </Button>
			</Stack>
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
							<DeleteIcon />
						</IconButton>
					}
					>
						<ListItemText primary={todo.task} />
					</ListItem>
				))}
			</List>
		</>
	);
}
