// import styles from './page.module.css';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import Todos from './todos';
import { Button } from '@mui/material';
import Main from './components/main';

export default async function Home() {
	const supabase = createClient();

  // const { data, error } = await supabase.auth.getUser();
  const { data, error } = await supabase.auth.getSession();

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
				<Todos session={data?.session} />
			)}
    </Main>
  );
}
