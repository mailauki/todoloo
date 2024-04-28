'use client';
import * as React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Close, Logout, Mail } from '@mui/icons-material';
import AccountForm from './account-form';
import { createClient } from '@/utils/supabase/client';
import type { User } from '@supabase/supabase-js';
import AvatarButton from './avatar-button';

export default function Profile({ user }: { user: User | null }) {
  const supabase = createClient();
  const [username, setUsername] = React.useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = React.useState<string | null>(null);
	const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	const getProfile = React.useCallback(async () => {
    try {
      // setLoading(true);

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, avatar_url`)
        .eq('id', user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert('Error loading user data!');
    // } finally {
    //   setLoading(false);
    }
  }, [user, supabase]);

  React.useEffect(() => {
    getProfile();
  }, [user, getProfile]);

	return (
		<>
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

				<List
					subheader={
					<ListSubheader>Hi, <span style={{ fontWeight: 600 }}>{username! || user?.email}</span>!</ListSubheader>
				}
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
						action='/auth/signout'
						component='form'
						disableGutters
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
			</Stack>

			<Dialog
        fullScreen={fullScreen}
				fullWidth
				maxWidth='xs'
				onClose={handleClose}
				open={open}
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
