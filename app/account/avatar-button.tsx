import React from 'react';
import { createClient } from '@/utils/supabase/client';
import { Edit } from '@mui/icons-material';
import { Avatar, Badge } from '@mui/material';

export default function AvatarButton({ url }: { url: string | null }) {
	const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(url);

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

	return (
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
					display: 'none',
				},
				'&:hover': {
					span: {
						display: 'inherit',
					},
				},
			}}
		>
			<Avatar
				alt='Avatar'
				src={avatarUrl!}
				sx={{ width: 100, height: 100 }}
			/>
		</Badge>
	);
}
