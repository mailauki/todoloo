import { createClient } from '@/utils/supabase/client';
import type { Todo } from '@/utils/types';

export const addTodo = async (taskText: string) => {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
	const user = data.session?.user;
	const task = taskText.trim();
	if (task.length && user) {
		const { data: todo, error } = await supabase
		.from('todos')
		.insert({ task, user_id: user.id })
		.select()
		.single();
		console.log(todo);

		if (error) {
			console.log(error.message);
		}
	}
};

export const deleteTodo = async (id: number) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getSession();
	const user = data.session?.user;
	if (error) {
		console.log(error.message);
	}
  if (user) {
    await supabase.from('todos').delete().match({ id: id, user_id: user.id });
  }
};

export const toggleTodo = async (todo: Todo) => {
  const supabase = createClient();
	const { error } = await supabase
	.from('todos')
	.update({ is_complete: !todo.is_complete })
	.eq('id', todo.id);

	if (error) {
		console.log(error.message);
	}
};
