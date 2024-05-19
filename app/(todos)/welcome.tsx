'use client';
import { Skeleton } from '@mui/material';

export default function LoadingWelcome() {
	return (
		<Skeleton
			height={170}
			sx={{ mb: 2 }}
			variant='rounded'
			width='100%'
		/>
	);
}
