'use client';
import React from 'react';
import { createClient } from '@/utils/supabase/client';
import { type User } from '@supabase/supabase-js';
import { Button, Stack, TextField } from '@mui/material';
import AvatarForm from './avatar-form';
import ColorPicker from '../components/color-picker';

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
  const [color, setColor] = React.useState<string | null>(null);

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

  async function updateProfile({
    username,
    avatar_url,
    color,
  }: {
    username: string | null
    fullname: string | null
    avatar_url: string | null
    color: string | null
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        avatar_url,
				color,
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
						updateProfile({ fullname, username, avatar_url: url, color });
					}}
					uid={user?.id ?? null}
					url={avatar_url}
				/>

				<ColorPicker
					color={color}
					onColorChange={(color_code) => {
						console.log(color_code);
						setColor(color_code);
						updateProfile({ fullname, username, avatar_url, color: color_code });
					}}
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
					onClick={() => updateProfile({ fullname, username, avatar_url, color })}
					size='large'
					variant='contained'
				>
					{loading ? 'Loading ...' : 'Update'}
				</Button>
			</Stack>
		</>
  );
}
