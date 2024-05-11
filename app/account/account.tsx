'use client';
import React from 'react';
import { Button, Card, CardContent, CardHeader, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, Toolbar, Typography } from '@mui/material';
import { ChevronRight, Edit, Logout, Mail, Palette } from '@mui/icons-material';
import Main from '../components/main';
import AccountForm from './account-form';
import type { User } from '@supabase/supabase-js';
import type { Profile } from '@/utils/types';
import AvatarDL from './avatar-dl';
import { createClient } from '@/utils/supabase/client';
import { updateProfile } from './actions';
import AvatarForm from './avatar-form';

export default function Account({ user, serverProfile }: { user: User | null, serverProfile: Profile }) {
	const [profile, setProfile] = React.useState(serverProfile);
	// const {full_name, username, avatar_url, color} = profile;
	const {username, avatar_url} = profile;
	const [openUpdate, setOpenUpdate] = React.useState(false);
	const [openColor, setOpenColor] = React.useState(false);
	const supabase = createClient();

	console.log(openColor);
	// console.log({user});
	// console.log({profile});
	// console.log({full_name}, {username}, {avatar_url}, {color});

  // const handleClick = () => {
  //   setOpen(!open);
  // };

	const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

	const handleOpenColor = () => {
    setOpenColor(true);
  };

  // const handleCloseColor = () => {
  //   setOpenColor(false);
  // };

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

	return (
		<>
			<Main>
				{!openUpdate ? (
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
										<ChevronRight />
									}
								>
									<ListItemButton onClick={handleOpenColor}>
										<ListItemIcon>
											<Palette />
										</ListItemIcon>
										<ListItemText primary='Color' />
									</ListItemButton>
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
				) : (
					<Stack spacing={2}>
						<Stack
							alignItems='center'
							direction='row'
							justifyContent='center'
						>
							<AvatarForm
								onUpload={(url: string) => {
									console.log(url);
									// setAvatarUrl(url);
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
								title={username! || user?.email}
							/>
							<CardContent>
								<Button
									color='info'
									onClick={handleCloseUpdate}
									sx={{  mb: 2 }}
								>
									Close
								</Button>
								<AccountForm profile={profile} user={user} />
							</CardContent>
						</Card>
					</Stack>
				)}
				<Toolbar sx={{ mt: 6 }} />
			</Main>
		</>
	);
}
