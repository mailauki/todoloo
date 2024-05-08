'use client';
import React from 'react';
import { Card, CardContent, CardHeader, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, Toolbar, Typography, alpha, useTheme } from '@mui/material';
import { ChevronRight, Edit, Logout, Mail } from '@mui/icons-material';
import Main from '../components/main';
import AccountForm from './account-form';
import BottomDrawer from '../components/bottom-drawer';
import type { User } from '@supabase/supabase-js';
import type { Profile } from '@/utils/types';
import AvatarDL from './avatar-dl';

export default function Profile({ user, profile }: { user: User | null, profile: Profile }) {
	const {full_name, username, avatar_url, color} = profile;
	const [open, setOpen] = React.useState(false);
  const theme = useTheme();

	console.log({user});
	console.log({profile});
	console.log({full_name}, {username}, {avatar_url}, {color});

  // const handleClick = () => {
  //   setOpen(!open);
  // };

	const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	return (
		<>
			<Main>
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
							// backgroundColor: 'primary.lighter',
							backgroundColor: alpha(theme.palette.background.paper, 0.45),
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
								<ListItemButton onClick={handleClickOpen}>
									<ListItemIcon>
										<Edit />
									</ListItemIcon>
									<ListItemText primary='Update Profile' />
								</ListItemButton>
							</ListItem>

							{/* <ListItem disablePadding>
								<ListItemButton onClick={handleClick}>
									<ListItemIcon>
										<Brush />
									</ListItemIcon>
									<ListItemText primary='Color' />
									{open ? <ExpandLess /> : <ExpandMore />}
								</ListItemButton>
							</ListItem>
							<Collapse in={open} timeout='auto' unmountOnExit>
								<List disablePadding>
									<ListItem sx={{ justifyContent: 'center' }}>
										<ColorPicker
											color={color}
											onColorChange={(color_code) => {
												console.log(color_code);
												setColor(color_code);
												updateProfile({ fullname, username, avatar_url, color: color_code });
											}}
										/>
									</ListItem>
								</List>
							</Collapse> */}

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
				<Toolbar sx={{ mt: 6 }} />
			</Main>

			<BottomDrawer handleClose={handleClose} open={open}>
				<AccountForm profile={profile} user={user} />
			</BottomDrawer>
		</>
	);
}
