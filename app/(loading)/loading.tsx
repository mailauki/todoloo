import { Skeleton } from '@mui/material';

export default function Loading() {
	return (
		<Skeleton
			height={410}
			sx={{ backgroundColor: 'card.paper' }}
			variant='rounded'
			width='100%'
		/>
	);
}
