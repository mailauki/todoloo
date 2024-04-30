import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import Profile from './profile';

export default async function Account() {
  const supabase = createClient();

  const {
    data: { user }, error,
  } = await supabase.auth.getUser();

	if (!user || error) {
		redirect('/login');
	}


	return (
		<>
			<Profile user={user} />
		</>
	);
}
