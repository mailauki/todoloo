'use client';
import React from 'react';
import { Card, CardContent, CardHeader, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack,  Typography } from '@mui/material';
import type { Profile as ProfileType, Settings as SettingsType } from '@/app/_utils/types';
import { createClient } from '@/app/_utils/supabase/client';
import Link from 'next/link';
import { ChevronRight, Edit, Logout, Mail, NightsStay, Palette, Settings } from '@mui/icons-material';
import AvatarDL from './avatar-dl';
import type { User } from '@supabase/supabase-js';

export default function Account({
	user,
	serverProfile,
}: {
	user: User,
	serverProfile: ProfileType,
}) {
	const supabase = createClient();
	const [profile, setProfile] = React.useState(serverProfile);

	// console.log({user});
	// console.log({profile});
	console.log({serverProfile});

	React.useEffect(() => {
		const channel = supabase.channel('realtime profile')
		.on('postgres_changes', {
			event: 'UPDATE',
			schema: 'public',
			table: 'profiles',
		}, (payload) => setProfile(payload.new as ProfileType))
		.on('postgres_changes', {
			event: 'UPDATE',
			schema: 'public',
			table: 'settings',
		}, (payload) => {
			setProfile(Object.assign(profile, {settings: payload.new as SettingsType}) as ProfileType);
			// setShowDates(payload.new.show_dates as boolean);
			// move to context
		})
		.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	});

	return (
		<Stack spacing={2}>
			<Stack
				alignItems='center'
				direction='row'
				justifyContent='center'
			>
				<Paper
					elevation={0}
					sx={{
						width: 'fit-content',
						borderRadius: '50%',
						p: 0.5,
					}}
				>
					<AvatarDL url={profile.avatar_url!} />
				</Paper>
			</Stack>

			<Card
				elevation={0}
				sx={{
					backgroundColor: 'card.paper',
				}}
			>
				<CardHeader
					sx={{ textAlign: 'center' }}
					title={profile.username! || user?.email}
				/>
				<List
					component={CardContent}
					disablePadding
				>
					<ListItem
						secondaryAction={
							<Typography
								color='text.secondary'
								variant='subtitle2'
							>
								{user?.email}
							</Typography>
						}
					>
						<ListItemIcon>
							<Mail />
						</ListItemIcon>
						<ListItemText primary='Email' />
					</ListItem>

					<ListItem
						disablePadding
						secondaryAction={
							<ChevronRight />
						}
					>
						<ListItemButton component={Link} href='/update/profile'>
							<ListItemIcon>
								<Edit />
							</ListItemIcon>
							<ListItemText primary='Update Profile' />
						</ListItemButton>
					</ListItem>

					<ListItem
						disablePadding
						secondaryAction={
							<ChevronRight />
						}
					>
						<ListItemButton component={Link} href='/update/settings'>
							<ListItemIcon>
								<Settings />
							</ListItemIcon>
							<ListItemText primary='App Settings' />
						</ListItemButton>
					</ListItem>

					<ListItem
						disablePadding
						secondaryAction={
							<Stack direction='row' spacing={1}>
								<Typography
									color='text.secondary'
									variant='subtitle2'
								>
									{profile.color}
								</Typography>
								<ChevronRight />
							</Stack>
						}
					>
						<ListItemButton component={Link} href='/update/color'>
							<ListItemIcon>
								<Palette />
							</ListItemIcon>
							<ListItemText primary='Color' />
						</ListItemButton>
					</ListItem>

					<ListItem
						disablePadding
						secondaryAction={
							<Stack direction='row' spacing={1}>
								<Typography
									color='text.secondary'
									variant='subtitle2'
								>
									{profile.settings?.theme_mode||'System'}
								</Typography>
								<ChevronRight />
							</Stack>
						}
					>
						<ListItemButton disabled>
							<ListItemIcon>
								<NightsStay />
							</ListItemIcon>
							<ListItemText primary='Theme' />
						</ListItemButton>
					</ListItem>

					<Divider sx={{ my: 2 }} />

					<ListItem
						action='/signout'
						component='form'
						disablePadding
						method='post'
					>
						<ListItemButton component='button' type='submit'>
							<ListItemIcon>
								<Logout />
							</ListItemIcon>
							<ListItemText primary='Signout' />
						</ListItemButton>
					</ListItem>
				</List>
			</Card>
		</Stack>
	);
}
