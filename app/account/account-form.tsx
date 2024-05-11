/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React from 'react';
import { type User } from '@supabase/supabase-js';
import { Button, Stack, TextField } from '@mui/material';
import AvatarForm from './avatar-form';
import ColorPicker from '../_components/color-picker';
import type { Profile } from '@/app/_utils/types';
import { updateProfile } from './actions';

export default function AccountForm({
  user, profile,
}: {
	user: User | null,
	profile: Profile,
}) {
	// const {full_name, username, avatar_url, color} = profile;
  // const [loading, setLoading] = React.useState(!profile);
  const [full_name, setFullname] = React.useState<string | null>(profile.full_name||null);
  const [username, setUsername] = React.useState<string | null>(profile.username||null);
  const [avatar_url, setAvatarUrl] = React.useState<string | null>(profile.avatar_url||null);
  const [color, setColor] = React.useState<string | null>(profile.color||null);

  return (
		<>
			<Stack
				// component='form'
				alignItems='center'
				spacing={2}
			>
				{/* <AvatarForm
					onUpload={(url) => {
						console.log(url);
						setAvatarUrl(url);
						updateProfile({ full_name, username, avatar_url: url, color });
					}}
					uid={user?.id ?? null}
					url={avatar_url}
				/> */}

				{/* <ColorPicker
					color={color}
					onColorChange={(color_code) => {
						console.log(color_code);
						setColor(color_code);
						updateProfile({ full_name, username, avatar_url, color: color_code });
					}}
				/> */}

				<TextField
					fullWidth
					id='fullName'
					label='Name'
					onChange={(e) => setFullname(e.target.value)}
					type='text'
					value={full_name || ''}
				/>
				<TextField
					fullWidth
					id='username'
					label='Username'
					onChange={(e) => setUsername(e.target.value)}
					type='text'
					value={username || ''}
				/>

				<Button
					// disabled={loading}
					fullWidth
					onClick={() => updateProfile({ full_name, username, avatar_url, color })}
					size='large'
					variant='contained'
				>
					{/* {loading ? 'Loading ...' : 'Update'} */}
					Update
				</Button>
			</Stack>
		</>
  );
}
