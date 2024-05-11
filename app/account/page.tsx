import { redirect } from 'next/navigation';
import { createClient } from '@/app/_utils/supabase/server';
import Account from './account';
import { Suspense } from 'react';
import LoadingBackground from '../(loading)/background';

export default async function AccountPage() {
  const supabase = createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

	if (!user || error) redirect('/login');

	const { data: profile, status } = await supabase
	.from('profiles')
	.select(`*, settings ( theme_mode, show_dates )`)
	.eq('id', user.id)
	.single();

	if (!profile && status !== 400) return <LoadingBackground />;

	// console.log({profile}, {status});

	return (
		<Suspense fallback={<LoadingBackground />}>
			<Account serverProfile={profile} user={user} />
		</Suspense>
	);
}
