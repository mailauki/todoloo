import Theme from '@/utils/theme';
import { Paper } from '@mui/material';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from './components/header';
import BottomNav from './components/bottom-nav';
import { createClient } from '@/utils/supabase/server';
import Background from './components/background';
// import { cookies } from 'next/headers';
// import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ToDoLoo',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	// const cookieStore = cookies();
	const supabase = createClient();

  const { data: { session } } = await supabase.auth.getSession();

	const { data: profile } = await supabase
	.from('profiles')
	.select('color')
	.eq('id', session?.user.id)
	.single();

  return (
    <html lang='en'>
			<Theme profileColor={profile?.color||null}>
				<Paper
					className={inter.className}
					component='body'
					elevation={0}
					square
					sx={{
						m: 0,
						height: '100vh',
						// backgroundColor: 'primary.extraLight',
						// backgroundColor: 'primary.light',
					}}
				>
					<Header />
					{children}
					<Background />
					{session && <BottomNav />}
				</Paper>
			</Theme>
    </html>
  );
}
