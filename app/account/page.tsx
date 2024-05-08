import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import Profile from './profile';

export default async function Account() {
  const supabase = createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

	if (!user || error) {
		redirect('/login');
	}

	console.log({user});
	const { data: profile } = await supabase
	.from('profiles')
	.select(`id, full_name, username, avatar_url, color`)
	.eq('id', user.id)
	.single();
	console.log({profile});

	if (!profile) return <p>Loading...</p>;

	return (
		<>
			<Profile profile={profile} user={user} />
		</>
	);
}
