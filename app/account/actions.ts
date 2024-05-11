import { createClient } from '@/app/_utils/supabase/client';
import type { VariantType} from 'notistack';
import { enqueueSnackbar } from 'notistack';

export const handleSnack = (variant: VariantType) => () => {
	if (variant === 'success') enqueueSnackbar('Profile updated!', {variant});
	else if (variant === 'error') enqueueSnackbar('Error updating the data!', {variant});
};

export async function updateProfile({
	username,
	full_name,
}: {
	username: string | null
	full_name: string | null
}) {
	const supabase = createClient();
	const { data } = await supabase.auth.getSession();
	const user = data.session?.user;
	try {
		const { error } = await supabase.from('profiles').upsert({
			id: user?.id as string,
			full_name,
			username,
			updated_at: new Date().toISOString(),
		});
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
	const { data } = await supabase.auth.getSession();
	const user = data.session?.user;
	try {
		const { error } = await supabase.from('profiles').upsert({
			id: user?.id as string,
			avatar_url,
			updated_at: new Date().toISOString(),
		});
		if (error) throw error;
		handleSnack('success')();
	} catch (error) {
		handleSnack('error')();
	}
}

export async function updateColor({
	color,
}: {
	color: string | null
}) {
	const supabase = createClient();
	const { data } = await supabase.auth.getSession();
	const user = data.session?.user;
	try {
		const { error } = await supabase.from('profiles').upsert({
			id: user?.id as string,
			color,
			updated_at: new Date().toISOString(),
		});
		if (error) throw error;
		handleSnack('success')();
	} catch (error) {
		handleSnack('error')();
	}
}

export function updateSettings() {
	console.log('update settings');
}
