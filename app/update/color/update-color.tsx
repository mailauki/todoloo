'use client';
import ColorPicker from '@/app/_components/color-picker';
import { Card, Stack } from '@mui/material';
// import { getProfile } from '@/app/account/actions';
// import { useEffect, useState } from 'react';
// import type { Profile } from '@/app/_utils/types';

export default function UpdateColor({
	color,
}: {
	color: string | null,
}) {
	// const [profile, setProfile] = useState<Profile|null>(null);

	// useEffect(() => {
	// 	const getData = async () => {
	// 		const data = await getProfile();
	// 		if (data) setProfile(data);
	// 	};

	// 	getData();
	// }, []);

	return (
		<Stack spacing={2}>
			<Card
				elevation={0}
				sx={{
					backgroundColor: 'card.paper',
				}}
			>
				<ColorPicker
					color={color!}
				/>
			</Card>
		</Stack>
	);
}
