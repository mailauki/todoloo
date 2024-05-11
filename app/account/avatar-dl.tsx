import React, { Suspense } from 'react';
import { Avatar, Skeleton } from '@mui/material';
import { createClient } from '@/app/_utils/supabase/client';


export default function AvatarDL({ url }: { url: string | null }) {
	const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(url);
	const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function downloadImage(path: string) {
			setLoading(true);

      try {
        const { data, error } = await supabase.storage.from('avatars').download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log('Error downloading image: ', error);
      } finally {
				setLoading(false);
			}
    }

    if (url) downloadImage(url);
  }, [url, supabase]);

	if (loading || !avatarUrl) return (
		<Skeleton height={100} variant='circular' width={100} />
	);

	return (
		<Suspense
			fallback={
				<Skeleton height={100} variant='circular' width={100} />
			}
		>
			<Avatar
				alt={avatarUrl! && 'Avatar'}
				src={avatarUrl!}
				sx={{ width: 100, height: 100 }}
			/>
		</Suspense>
	);
}
