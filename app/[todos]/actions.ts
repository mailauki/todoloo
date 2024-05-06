import { createClient } from '@/utils/supabase/client';

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
