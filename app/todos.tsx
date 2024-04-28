'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
// import { cookies } from 'next/headers';
import type { Session } from '@supabase/supabase-js';
import type { UUID } from 'crypto';

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

	return (
		<>
			<form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo(newTaskText);
        }}
			>
				<input
          onChange={(e) => {
            setNewTaskText(e.target.value);
          }}
          type='text'
          value={newTaskText}
				/>
				<button type='submit'>
          Add
        </button>
			</form>
			<ul>
				{todos?.map((todo) => (
					<li key={todo.id}>{todo.task}</li>
				))}
			</ul>
		</>
	);
}
