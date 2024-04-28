import styles from './page.module.css';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function Home() {
	const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  return (
    <main className={styles.main}>
			{error || !data?.user ? (
				<Link href='/login'>Login</Link>
			) : (
				<>
				</>
			)}
    </main>
  );
}
