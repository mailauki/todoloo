'use client';
import * as React from 'react';
import { Card, CardContent, CardHeader, Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Close, Logout, Mail } from '@mui/icons-material';
import AccountForm from './account-form';
import { createClient } from '@/utils/supabase/client';
import type { User } from '@supabase/supabase-js';
import AvatarButton from './avatar-button';
import Main from '../components/main';

export default function Profile({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = React.useState(true);
  const [fullname, setFullname] = React.useState<string | null>(null);
  const [username, setUsername] = React.useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = React.useState<string | null>(null);
  const [color, setColor] = React.useState<string | null>(null);
	const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	console.log({loading}, {fullname}, {color});

  // const handleClick = () => {
  //   setOpen(!open);
  // };

	const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	const getProfile = React.useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, avatar_url, color`)
        .eq('id', user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
				setColor(data.color);
      }
    } catch (error) {
      alert('Error loading user data!');
		} finally {
			setLoading(false);
		}
  }, [user, supabase]);

  React.useEffect(() => {
    getProfile();
  }, [user, getProfile]);

	// async function updateProfile({
  //   username,
	// 	fullname,
  //   avatar_url,
  //   color,
  // }: {
  //   username: string | null
  //   fullname: string | null
  //   avatar_url: string | null
  //   color: string | null
  // }) {
  //   try {
  //     setLoading(true);

  //     const { error } = await supabase.from('profiles').upsert({
  //       id: user?.id as string,
  //       full_name: fullname,
  //       username,
  //       avatar_url,
	// 			color,
  //       updated_at: new Date().toISOString(),
  //     });
  //     if (error) throw error;
  //     alert('Profile updated!');
  //   } catch (error) {
  //     alert('Error updating the data!');
  //   } finally {
  //     setLoading(false);
  //   }
  // }

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
							elevation={1}
							sx={{
								width: 'fit-content',
								borderRadius: '50%',
							}}
						>
							<IconButton
								onClick={handleClickOpen}
								sx={{ p: 0.5 }}
							>
								<AvatarButton url={avatar_url} />
							</IconButton>
						</Paper>
					</Stack>

					<Card
						elevation={0}
						sx={{
							backgroundColor: 'primary.lighter',
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
			</Main>

			<Dialog
        fullScreen={fullScreen}
				fullWidth
				maxWidth='xs'
				onClose={handleClose}
				open={open}
				sx={{
					'& .MuiDialog-paper': {
						backgroundColor: (theme) => theme.palette.background.default,
					},
				}}
			>
				<DialogTitle>Edit Account</DialogTitle>
				<IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
				<DialogContent>
					<AccountForm user={user} />
				</DialogContent>
			</Dialog>
		</>
	);
}
