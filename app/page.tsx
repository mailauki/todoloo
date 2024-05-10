// import styles from './page.module.css';
import { createClient } from '@/utils/supabase/server';
import { Toolbar } from '@mui/material';
import Main from './components/main';
import Todos from './[todos]/todos';
import { redirect } from 'next/navigation';

export default async function HomePage() {
	const supabase = createClient();

  const { data: { session }, error } = await supabase.auth.getSession();
	console.log({session});

	if (!session || error) redirect('/login');

	const { data: todos } = await supabase
	.from('todos')
	.select()
	.eq('user_id', session?.user.id);

	console.log({todos}, {session});
	// console.log({session});

  return (
		<Main>
			<Todos serverTodos={todos!} />
			<Toolbar sx={{ mt: 6 }} />
		</Main>
  );
}
