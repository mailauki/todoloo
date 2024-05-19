import { redirect } from 'next/navigation';
import UpdateColor from './update-color';
import { createClient } from '@/app/_utils/supabase/server';

export default async function updateColorPage() {
  const supabase = createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

	if (!user || error) redirect('/login');

	const { data: profile } = await supabase
	.from('profiles')
	.select(`color`)
	.eq('id', user.id)
	.single();

	return (
		<UpdateColor color={profile?.color} />
	);
}
