import { createClient } from '@/app/_utils/supabase/client';
import type { VariantType} from 'notistack';
import { enqueueSnackbar } from 'notistack';

export const handleSnack = (variant: VariantType) => () => {
	if (variant === 'success') enqueueSnackbar('Profile updated!', {variant});
	else if (variant === 'error') enqueueSnackbar('Error updating the data!', {variant});
};

export async function updateProfile(formData: FormData) {
	const supabase = createClient();

	const { data: { user } } = await supabase.auth.getUser();

	const full_name = formData.get('full_name') as string;
  const username = formData.get('username') as string;

	try {
		const { error } = await supabase.from('profiles')
		.upsert({
			full_name,
			username,
			updated_at: new Date().toISOString(),
		})
		.match({ id: user?.id });
		if (error) throw error;
		handleSnack('success')();
	} catch (error) {
		handleSnack('error')();
	}
}

export async function updateAvatar({
	avatar_url,
}: {
	avatar_url: string | null
}) {
	const supabase = createClient();
	const { data: { user } } = await supabase.auth.getUser();
	try {
		const { error } = await supabase.from('profiles')
		.upsert({
			avatar_url,
			updated_at: new Date().toISOString(),
		})
		.match({ id: user?.id });
		if (error) throw error;
		handleSnack('success')();
	} catch (error) {
		handleSnack('error')();
	}
}

export async function updateColor(formData: FormData) {
	const supabase = createClient();

	const { data: { user } } = await supabase.auth.getUser();

	const color = formData.get('color') as string;

	try {
		const { error } = await supabase.from('profiles')
		.update({
			color,
			updated_at: new Date().toISOString(),
		})
		.match({ id: user?.id });
		if (error) throw error;
		handleSnack('success')();
	} catch (error) {
		handleSnack('error')();
	}
}

export async function updateSettings({ showDates, showWelcome }: { showDates?: boolean, showWelcome?: boolean }) {
	console.log('update settings', {showDates});
	const supabase = createClient();
	const { data: { user } } = await supabase.auth.getUser();
	const { data: profile } = await supabase.from('profiles')
	.select(`*, settings ( theme_mode, show_dates )`)
	.single();
	try {
		const { data, error } = await supabase.from('settings')
		.update({
			show_dates: !showDates ?? profile?.settings.show_dates,
			show_welcome: !showWelcome ?? profile?.settings.show_welcome,
		})
		.match({ user_id: user?.id, profile_id: user?.id })
		.select();
		if (error) throw error;
		handleSnack('success')();
		console.log({data});
	} catch (error) {
		handleSnack('error')();
	}
}
