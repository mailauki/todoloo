import { redirect } from 'next/navigation';
import ProfileSettings from './profile-settings';
import { createClient } from '@/app/_utils/supabase/server';

export default async function updateSettingsPage() {
  const supabase = createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

	if (!user || error) redirect('/login');

	const { data: settings } = await supabase
	.from('settings')
	.select()
	.eq('id', user.id)
	.single();

	return (
		<ProfileSettings settings={settings!} />
	);
}
