import { Container, Toolbar } from '@mui/material';

export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<Container component='main' maxWidth='xs'>
			<Toolbar sx={{ mb: 3 }} />
			{children}
		</Container>
	);
}
