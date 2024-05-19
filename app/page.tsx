// import styles from './page.module.css';
import { createClient } from '@/app/_utils/supabase/server';
import { Toolbar } from '@mui/material';
import Main from './_components/main';
import Todos from './(todos)/todos';
import { redirect } from 'next/navigation';
import BottomDrawer from './_components/bottom-drawer';
import TodoForm from './(todos)/todo-form';
import { Suspense } from 'react';
import LoadingTodos from './(loading)/todos';
import Welcome from './_components/welcome';
import LoadingWelcome from './(todos)/welcome';
import type { Todo } from './_utils/types';
export default async function HomePage() {
	const supabase = createClient();

  // const { data: { session }, error } = await supabase.auth.getSession();
	// console.log({session});
	const { data: { user } } = await supabase.auth.getUser();

	if (!user) redirect('/login');

	const { data: todos } = await supabase
	.from('todos')
	.select()
	.eq('user_id', user.id)
	.order('due_date', { ascending: false });

	const { data: settings } = await supabase
	.from('settings')
	.select()
	.eq('user_id', user.id)
	.single();
	// console.log(settings);

	// console.log(todos!.map((todo) => Object.assign(todo, { show_dates: settings.show_dates })));

  return (
		<Main>
			<Suspense fallback={<LoadingWelcome />}>
				{settings.show_welcome && <Welcome />}
			</Suspense>
			<Suspense fallback={<LoadingTodos />}>
				<Todos serverTodos={todos!.map((todo) => Object.assign(todo, { show_dates: settings.show_dates }) as Todo)} />
			</Suspense>
			{todos && (
				<BottomDrawer>
					<TodoForm />
				</BottomDrawer>
			)}
			<Toolbar sx={{ mt: 6 }} />
		</Main>
  );
}
