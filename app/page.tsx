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

  return (
		<Main>
			{/* <pre>{JSON.stringify(show_dates, null, 2)}</pre> */}
			<Todos serverTodos={todos!} />
			<BottomDrawer>
				<TodoForm />
			</BottomDrawer>
			<Toolbar sx={{ mt: 6 }} />
		</Main>
  );
}
