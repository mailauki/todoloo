import { redirect } from 'next/navigation';
import UpdateProfile from './update-profile';
import { createClient } from '@/app/_utils/supabase/server';

export default async function updateProfilePage() {
  const supabase = createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

	if (!user || error) redirect('/login');

	const { data: profile } = await supabase
	.from('profiles')
	.select()
	.eq('id', user.id)
	.single();

	return (
		<UpdateProfile profile={profile} user={user!} />
	);
}
