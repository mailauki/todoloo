import { Toolbar } from '@mui/material';
import Main from '../_components/main';
import { Suspense } from 'react';
import LoadingProfile from '../(loading)/profile';

export default function UpdateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<Main>
			<Suspense fallback={<LoadingProfile />}>
				{children}
			</Suspense>
			<Toolbar sx={{ mt: 6 }} />
		</Main>
	);
}
