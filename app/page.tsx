import styles from './page.module.css';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import Todos from './todos';

export default async function Home() {
	const supabase = createClient();

  // const { data, error } = await supabase.auth.getUser();
  const { data, error } = await supabase.auth.getSession();

  return (
    <main className={styles.main}>
			{error || !data?.session ? (
				<Link href='/login'>Login</Link>
			) : (
				<Todos session={data?.session} />
			)}
    </main>
  );
}
