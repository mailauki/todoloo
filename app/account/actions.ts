import { createClient } from '@/app/_utils/supabase/client';
import type { VariantType} from 'notistack';
import { enqueueSnackbar } from 'notistack';

export async function updateProfile({
	username,
	full_name,
	avatar_url,
	color,
}: {
	username: string | null
	full_name: string | null
	avatar_url: string | null
	color: string | null
}) {
	const supabase = createClient();
	const { data } = await supabase.auth.getSession();
	const user = data.session?.user;
	try {
		const { error } = await supabase.from('profiles').upsert({
			id: user?.id as string,
			full_name,
			username,
			avatar_url,
			color,
			updated_at: new Date().toISOString(),
		});
		if (error) throw error;
		handleSnack('success')();
	} catch (error) {
		handleSnack('error')();
	}
}

export const handleSnack = (variant: VariantType) => () => {
	if (variant === 'success') enqueueSnackbar('Profile updated!', {variant});
	else if (variant === 'error') enqueueSnackbar('Error updating the data!', {variant});
};
