'use client';
import { Skeleton, Stack } from '@mui/material';

export default function LoadingTodos() {
	return (
		<Stack spacing={2} sx={{ mb: 2 }}>
			<Skeleton
				height={60}
				sx={{ backgroundColor: 'card.paper' }}
				variant='rounded'
				width='100%'
			/>
			<Skeleton
				height={60}
				sx={{ backgroundColor: 'card.paper' }}
				variant='rounded'
				width='100%'
			/>
			<Skeleton
				height={60}
				sx={{ backgroundColor: 'card.paper' }}
				variant='rounded'
				width='100%'
			/>
		</Stack>
	);
}
