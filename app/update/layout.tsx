import { Toolbar } from '@mui/material';
import Main from '../_components/main';
import { Suspense } from 'react';
import Loading from '../(loading)/loading';

export default function UpdateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<Main>
			<Suspense fallback={<Loading />}>
				{children}
			</Suspense>
			<Toolbar sx={{ mt: 6 }} />
		</Main>
	);
}
