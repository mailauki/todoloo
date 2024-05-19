'use client';
import { Card, CardContent, CardHeader, Stack } from '@mui/material';
import { updateAvatar } from '@/app/account/actions';
import AvatarForm from '@/app/account/avatar-form';
import AccountForm from '@/app/account/account-form';
import type { User } from '@supabase/supabase-js';
import type { Profile } from '@/app/_utils/types';

export default function UpdateProfile({
	user,
	profile,
}: {
	user: User,
	profile: Profile,
}) {

	return (
		<Stack spacing={2}>
			<Stack
				alignItems='center'
				direction='row'
				justifyContent='center'
			>
				<AvatarForm
					onUpload={(url: string) => {
						updateAvatar({ avatar_url: url });
					}}
					uid={user?.id ?? null}
					url={profile.avatar_url!}
				/>
			</Stack>
			<Card
				elevation={0}
				sx={{
					backgroundColor: 'card.paper',
				}}
			>
				<CardHeader
					sx={{ textAlign: 'center' }}
					title='Update Profile'
				/>
				<CardContent>
					<AccountForm profile={profile} />
				</CardContent>
			</Card>
		</Stack>
	);
}
