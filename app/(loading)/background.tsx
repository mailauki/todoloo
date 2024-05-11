import { Skeleton } from '@mui/material';

export default function LoadingBackground() {
	return (
		<Skeleton
			sx={{
				position: 'fixed',
				bottom: 0,
				left: 'auto',
				right: 'auto',
				height: '100%',
				width: '100%',
				minWidth: '600px',
				zIndex: -1,
			}}
			variant='rectangular'
		/>
	);
}
