import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import Profile from './profile';
import Main from '../components/main';

export default async function Account() {
  const supabase = createClient();

  const {
    data: { user }, error,
  } = await supabase.auth.getUser();

	if (!user || error) {
		redirect('/login');
	}

	return (
		<Main>
			<Profile user={user} />
		</Main>
	);
}
