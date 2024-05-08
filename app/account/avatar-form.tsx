'use client';
import React from 'react';
import { createClient } from '@/utils/supabase/client';
import { Badge, IconButton, Paper, Stack } from '@mui/material';
import { Edit } from '@mui/icons-material';
import AvatarDL from './avatar-dl';

export default function AvatarForm({
  uid,
  url,
  onUpload,
}: {
  uid: string | null
  url: string | null
  onUpload: (url: string) => void
}) {
  const supabase = createClient();
  const [uploading, setUploading] = React.useState(false);

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
    <Stack>
			<Paper
				elevation={0}
				sx={{
					width: 'fit-content',
					borderRadius: '50%',
				}}
			>
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
				<IconButton
					component='label'
					disabled={uploading}
					htmlFor='single'
					sx={{ p: 0.5 }}
				>
					<Badge
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}
						badgeContent={
							<Edit fontSize='small' />
						}
						color='primary'
						overlap='circular'
						sx={{
							span: {
								borderRadius: 8,
								width: 30,
								height: 30,
							},
						}}
					>
						<AvatarDL url={url} />
					</Badge>
				</IconButton>
			</Paper>
    </Stack>
  );
}
