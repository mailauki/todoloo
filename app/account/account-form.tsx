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
	console.log({profile});

  return (
		<>
			<Stack
				alignItems='center'
				component='form'
				spacing={2}
			>

				<TextField
					fullWidth
					id='full_name'
					label='Name'
					name='full_name'
					onChange={(e) => setFullname(e.target.value)}
					type='text'
					value={full_name || ''}
					variant='standard'
				/>
				<TextField
					fullWidth
					id='username'
					label='Username'
					name='username'
					onChange={(e) => setUsername(e.target.value)}
					type='text'
					value={username || ''}
					variant='standard'
				/>

				<Button
					// disabled={loading}
					formAction={updateProfile}
					fullWidth
					// onClick={() => updateProfile({ full_name, username })}
					size='large'
					type='submit'
					variant='contained'
				>
					{/* {loading ? 'Loading ...' : 'Update'} */}
					Update
				</Button>
			</Stack>
		</>
  );
}
