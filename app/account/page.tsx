import { redirect } from 'next/navigation';
import { createClient } from '@/app/_utils/supabase/server';
import Account from './account';

export default async function AccountPage() {
  const supabase = createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

	if (!user || error) redirect('/login');

	const { data: profile } = await supabase
	.from('profiles')
	.select()
	.eq('id', user.id)
	.single();

	if (!profile) return <p>Loading...</p>;

	return (
		<Account serverProfile={profile} user={user} />
	);
}
