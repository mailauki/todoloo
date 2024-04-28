import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import Profile from './profile';
import Main from '../components/main';
import { Paper, Toolbar } from '@mui/material';

export default async function Account() {
  const supabase = createClient();

  const {
    data: { user }, error,
  } = await supabase.auth.getUser();

	if (!user || error) {
		redirect('/login');
	}

	return (
		<>
			<Paper
				elevation={0}
				square
				sx={{
					background: 'linear-gradient(#e66465, rgba(0,0,0,0));',
					position: 'fixed',
					top: 0,
					height: '200px',
					width: '100%',
					zIndex: -1,
				}}
			>
				<Toolbar />
			</Paper>
			<Main>
				<Profile user={user} />
			</Main>
		</>
	);
}
