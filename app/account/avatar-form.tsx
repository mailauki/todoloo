'use client';
import React from 'react';
import { createClient } from '@/utils/supabase/client';
import { Avatar, Button, Stack } from '@mui/material';

export default function AvatarForm({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string | null
  url: string | null
  size: number
  onUpload: (url: string) => void
}) {
  const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(url);
  const [uploading, setUploading] = React.useState(false);

  React.useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage.from('avatars').download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log('Error downloading image: ', error);
      }
    }

    if (url) downloadImage(url);
  }, [url, supabase]);

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert('Error uploading avatar!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Stack spacing={1}>
      {avatarUrl && (
				<Avatar
					alt='Avatar'
					src={avatarUrl}
					sx={{ height: size, width: size }}
				/>
      )}
      <div style={{ width: size }}>
        <input
          accept='image/*'
          disabled={uploading}
          id='single'
          onChange={uploadAvatar}
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type='file'
        />
				<Button
					component='label'
					fullWidth
					htmlFor='single'
					variant='outlined'
				>
					{uploading ? 'Uploading ...' : 'Upload Avatar'}
				</Button>
      </div>
    </Stack>
  );
}
