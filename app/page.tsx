// import styles from './page.module.css';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { Button } from '@mui/material';
// import Todos from './todos';
import Main from './components/main';
import Todos from './[todos]/todos';

export default async function Home() {
	const supabase = createClient();

  const { data, error } = await supabase.auth.getSession();
	const { data: todos } = await supabase.from('todos').select();

  return (
		<Main>
			{error || !data?.session ? (
				<>
					<Button
						component={Link}
						fullWidth
						href='/login'
						size='large'
						variant='contained'
					>
						Login
					</Button>
				</>
			) : (
				// <Todos session={data?.session} />
				<Todos serverTodos={todos!} />
			)}
		</Main>
  );
}
