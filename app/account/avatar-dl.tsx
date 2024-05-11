import React from 'react';
import { Avatar } from '@mui/material';
import { createClient } from '@/app/_utils/supabase/client';


export default function AvatarDL({ url }: { url: string | null }) {
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
		<Avatar
			alt='Avatar'
			src={avatarUrl!}
			sx={{ width: 100, height: 100 }}
		/>
	);
}
