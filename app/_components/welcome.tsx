'use client';
import { Card, CardContent, CardHeader } from '@mui/material';
import Time from './time';
import moment from 'moment';
import { createClient } from '../_utils/supabase/client';
import { useEffect, useState } from 'react';

export default function Welcome() {
	const today = moment().format('dddd[,] MMM Do');
	const [name, setName] = useState(null);

	useEffect(() => {
		const getUser = async () => {
			const supabase = createClient();

			const { data: { user } } = await supabase.auth.getUser();
			const { data: profile } = await supabase.from('profiles')
			.select('full_name, username')
			.match({ id: user?.id })
			.single();

			if (profile && profile.full_name) setName(profile?.full_name);
		};

		getUser();
	}, []);

	return (
		<Card
			// elevation={0}
			sx={{
				backgroundColor: 'card.paper',
				mb: 2,
			}}
			variant='outlined'
		>
			<CardHeader
				subheader={`Today is ${today}`}
				title={name ? `Hello, ${name!}` : 'Hello'}
			/>
			<CardContent sx={{ pt: 0 }}>
				<Time />
			</CardContent>
		</Card>
	);
}
