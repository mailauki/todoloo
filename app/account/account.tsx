'use client';
import React from 'react';
import { Card, CardContent, CardHeader, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, Toolbar, Typography } from '@mui/material';
import { ChevronRight, Edit, Logout, Mail, NightsStay, Palette } from '@mui/icons-material';
import Main from '../components/main';
import AccountForm from './account-form';
import type { User } from '@supabase/supabase-js';
import type { Profile } from '@/utils/types';
import AvatarDL from './avatar-dl';
import { createClient } from '@/utils/supabase/client';
import { updateProfile } from './actions';
import AvatarForm from './avatar-form';
import { useOpen } from '@/utils/context';
import ColorPicker from '../components/color-picker';

export default function Account({
	user, serverProfile,
}: {
	user: User | null,
	serverProfile: Profile,
}) {
	const [profile, setProfile] = React.useState(serverProfile);
	// const {full_name, username, avatar_url, color} = profile;
	const {username, avatar_url} = profile;
	const { openProfileUpdate, setOpenProfileUpdate, openProfileColor, setOpenProfileColor } = useOpen();
	const supabase = createClient();

	// console.log({user});
	// console.log({profile});
	// console.log({full_name}, {username}, {avatar_url}, {color});

	const handleOpenUpdate = () => {
    setOpenProfileUpdate(true);
  };

	const handleOpenColor = () => {
    setOpenProfileColor(true);
  };

	React.useEffect(() => {
		const channel = supabase.channel('realtime profile')
		.on('postgres_changes', {
			event: 'UPDATE',
			schema: 'public',
			table: 'profiles',
		}, (payload) => setProfile(payload.new as Profile))
		.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	});

	function Profile() {
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
						<AvatarDL url={avatar_url} />
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
						title={username! || user?.email}
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
							<ListItemButton onClick={handleOpenUpdate}>
								<ListItemIcon>
									<Edit />
								</ListItemIcon>
								<ListItemText primary='Update Profile' />
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
							<ListItemButton onClick={handleOpenColor}>
								<ListItemIcon>
									<Palette />
								</ListItemIcon>
								<ListItemText primary='Color' />
							</ListItemButton>
						</ListItem>

						<ListItem
							secondaryAction={
								<Typography
									color='text.secondary'
									variant='subtitle2'
								>
									system
								</Typography>
							}
						>
							<ListItemIcon>
								<NightsStay />
							</ListItemIcon>
							<ListItemText primary='Theme' />
						</ListItem>

						<Divider sx={{ my: 2 }} />

						<ListItem
							action='/auth/signout'
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

	function UpdateProfile() {
		return (
			<Stack spacing={2}>
				<Stack
					alignItems='center'
					direction='row'
					justifyContent='center'
				>
					<AvatarForm
						onUpload={(url: string) => {
							console.log(url);
							updateProfile({ full_name: profile.full_name, username: profile.username, avatar_url: url, color: profile.color });
						}}
						uid={user?.id ?? null}
						url={avatar_url}
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
						<AccountForm profile={profile} user={user} />
					</CardContent>
				</Card>
			</Stack>
		);
	}

	function UpdateColor() {
		return (
			<Stack spacing={2}>
				<Card
					elevation={0}
					sx={{
						backgroundColor: 'card.paper',
					}}
				>
					<CardHeader
						sx={{ textAlign: 'center' }}
						title='Profile Color'
					/>
					<CardContent>
						<ColorPicker
							color={profile.color}
							onColorChange={(color_code) => {
								console.log(color_code);
								updateProfile({ full_name: profile.full_name, username: profile.username, avatar_url: profile.avatar_url, color: color_code });
							}}
						/>
					</CardContent>
				</Card>
			</Stack>
		);
	}

	return (
		<>
			<Main>
				{(!openProfileUpdate&&!openProfileColor) && (
					<Profile />
				)}
				{openProfileUpdate && (
					<UpdateProfile />
				)}
				{openProfileColor && (
					<UpdateColor />
				)}
				<Toolbar sx={{ mt: 6 }} />
			</Main>
		</>
	);
}
