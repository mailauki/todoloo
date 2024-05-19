'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, Switch, Toolbar, Typography } from '@mui/material';
import { CalendarToday, ChevronRight, Edit, Logout, Mail, NightsStay, Palette, Settings } from '@mui/icons-material';
import Main from '../_components/main';
import AccountForm from './account-form';
import type { User } from '@supabase/supabase-js';
import type { Profile, Settings as SettingsType } from '@/app/_utils/types';
import AvatarDL from './avatar-dl';
import { createClient } from '@/app/_utils/supabase/client';
import { updateAvatar, updateSettings } from './actions';
import AvatarForm from './avatar-form';
import { useOpen } from '@/app/_utils/context';
import ColorPicker from '../_components/color-picker';

export default function Account({
	user, serverProfile,
}: {
	user: User | null,
	serverProfile: Profile,
}) {
	const supabase = createClient();
	const [profile, setProfile] = React.useState(serverProfile);
	const {username, avatar_url} = profile;
	const { openProfileUpdate, setOpenProfileUpdate, openProfileColor, setOpenProfileColor, openProfileSettings, setOpenProfileSettings } = useOpen();
	// const [showDates, setShowDates] = React.useState<boolean|undefined>(profile.settings?.show_dates||true);
	const [showDates, setShowDates] = useState<boolean>(profile.settings?.show_dates||true);

	// console.log({user});
	console.log({profile});

	const handleOpenUpdate = () => {
    setOpenProfileUpdate(true);
  };

	const handleOpenColor = () => {
    setOpenProfileColor(true);
  };

	const handleOpenSettings = () => {
		setOpenProfileSettings(true);
	};

	React.useEffect(() => {
		const channel = supabase.channel('realtime profile')
		.on('postgres_changes', {
			event: 'UPDATE',
			schema: 'public',
			table: 'profiles',
		}, (payload) => setProfile(payload.new as Profile))
		.on('postgres_changes', {
			event: 'UPDATE',
			schema: 'public',
			table: 'settings',
		}, (payload) => {
			setProfile(Object.assign(profile, {settings: payload.new as SettingsType}) as Profile);
			setShowDates(payload.new.show_dates as boolean);
			// move to context
		})
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
						<AvatarDL url={avatar_url!} />
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
								<ChevronRight />
							}
						>
							<ListItemButton onClick={handleOpenSettings}>
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
							<ListItemButton onClick={handleOpenColor}>
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
							updateAvatar({ avatar_url: url });
						}}
						uid={user?.id ?? null}
						url={avatar_url!}
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

	function UpdateColor() {
		return (
			<Stack spacing={2}>
				<Card
					elevation={0}
					sx={{
						backgroundColor: 'card.paper',
					}}
				>
					<ColorPicker
						color={profile.color!}
					/>
				</Card>
			</Stack>
		);
	}

	function ProfileSettings() {
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
						title='App Settings'
					/>
					<List
						component={CardContent}
						disablePadding
					>
						<ListItem
							disablePadding
							secondaryAction={
								<Switch
									checked={showDates}
									edge='end'
									inputProps={{
										'aria-labelledby': 'switch-list-label-wifi',
									}}
									onChange={() => {
										// setShowDates(!showDates);
										// handleShowDates({showDates: settings!.show_dates});
										// updateSettings({showDates: profile.settings!.show_dates});
										updateSettings({showDates});
									}}
								/>
							}
						>
							<ListItemButton
								onClick={() => {
									// setShowDates(!showDates);
									// handleShowDates({showDates: settings!.show_dates});
									// updateSettings({showDates: profile.settings!.show_dates});
									updateSettings({showDates});
								}}
							>
								<ListItemIcon>
									<CalendarToday />
								</ListItemIcon>
								<ListItemText primary='Show dates' />
							</ListItemButton>
						</ListItem>
					</List>
				</Card>
			</Stack>
		);
	}

	return (
		<>
			<Main>
				{(!openProfileUpdate&&!openProfileColor&&!openProfileSettings) && (
					<Profile />
				)}
				{openProfileUpdate && (
					<UpdateProfile />
				)}
				{openProfileColor && (
					<UpdateColor />
				)}
				{openProfileSettings && (
					<ProfileSettings />
				)}
				<Toolbar sx={{ mt: 6 }} />
			</Main>
		</>
	);
}
