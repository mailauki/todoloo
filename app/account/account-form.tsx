'use client';
import * as React from 'react';
import { createClient } from '@/utils/supabase/client';
import { type User } from '@supabase/supabase-js';
import { Button, Stack, TextField } from '@mui/material';
import AvatarForm from './avatar-form';

export default function AccountForm({
  user,
}: {
	user: User | null,
}) {
  const supabase = createClient();
  const [loading, setLoading] = React.useState(true);
  const [fullname, setFullname] = React.useState<string | null>(null);
  const [username, setUsername] = React.useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = React.useState<string | null>(null);

  const getProfile = React.useCallback(async () => {
    try {
      setLoading(true);

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
        setFullname(data.full_name);
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
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

  async function updateProfile({
    username,
    avatar_url,
  }: {
    username: string | null
    fullname: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert('Profile updated!');
    } catch (error) {
      alert('Error updating the data!');
    } finally {
      setLoading(false);
    }
  }

  return (
		<>
			<Stack
				// component='form'
				alignItems='center'
				spacing={2}
			>
				<AvatarForm
					onUpload={(url) => {
						setAvatarUrl(url);
						updateProfile({ fullname, username, avatar_url: url });
					}}
					uid={user?.id ?? null}
					url={avatar_url}
				/>

				<TextField
					fullWidth
					id='fullName'
					label='Name'
					onChange={(e) => setFullname(e.target.value)}
					type='text'
					value={fullname || ''}
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
					disabled={loading}
					fullWidth
					onClick={() => updateProfile({ fullname, username, avatar_url })}
					size='large'
					variant='contained'
				>
					{loading ? 'Loading ...' : 'Update'}
				</Button>
			</Stack>
		</>
  );
}
