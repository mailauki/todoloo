'use client';
import React from 'react';
import { Button, Stack, TextField } from '@mui/material';
import type { Profile } from '@/app/_utils/types';
import { updateProfile } from './actions';

export default function AccountForm({
  profile,
}: {
	profile: Profile,
}) {
	// const {full_name, username, avatar_url, color} = profile;
  // const [loading, setLoading] = React.useState(!profile);
  const [full_name, setFullname] = React.useState<string | null>(profile.full_name||null);
  const [username, setUsername] = React.useState<string | null>(profile.username||null);

  return (
		<>
			<Stack
				// component='form'
				alignItems='center'
				spacing={2}
			>

				<TextField
					fullWidth
					id='fullName'
					label='Name'
					onChange={(e) => setFullname(e.target.value)}
					type='text'
					value={full_name || ''}
					variant='standard'
				/>
				<TextField
					fullWidth
					id='username'
					label='Username'
					onChange={(e) => setUsername(e.target.value)}
					type='text'
					value={username || ''}
					variant='standard'
				/>

				<Button
					// disabled={loading}
					fullWidth
					onClick={() => updateProfile({ full_name, username })}
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
