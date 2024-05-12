// import styles from './page.module.css';
import { createClient } from '@/app/_utils/supabase/server';
import { Toolbar } from '@mui/material';
import Main from './_components/main';
import Todos from './(todos)/todos';
import { redirect } from 'next/navigation';
import BottomDrawer from './_components/bottom-drawer';
import TodoForm from './(todos)/todo-form';
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

	// console.log({todos}, {session});
	// console.log({session});
	// const {show_dates} = show_dates!;
	// console.log({show_dates});

	// const { data: profile } = await supabase
	// .from('profiles')
	// .select(`
	// 	*,
	// 	todos ( id, task, due_date ),
	// 	settings ( id, show_dates )
	// `)
	// .eq('id', user.id)
	// .order('due_date', { referencedTable: 'todos', ascending: false })
	// .single();
	// console.log({profile});
	const { data: show_dates } = await supabase
	.from('settings')
	.select('show_dates')
	.eq('user_id', user.id)
	.single();
	console.log(show_dates);

	console.log(todos!.map((todo) => Object.assign(todo, show_dates)));

  return (
		<Main>
			{/* <pre>{JSON.stringify(show_dates, null, 2)}</pre> */}
			<Todos serverTodos={todos!.map((todo) => Object.assign(todo, show_dates))} />
			<BottomDrawer>
				<TodoForm />
			</BottomDrawer>
			<Toolbar sx={{ mt: 6 }} />
		</Main>
  );
}
