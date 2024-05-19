import { Paper, Stack } from '@mui/material';
import LoadingAvatar from './avatar';
import Loading from './loading';

export default function LoadingProfile() {
	return (
		<Stack spacing={2}>
			<Stack
				alignItems='center'
				direction='row'
				justifyContent='center'
			>
				<Paper
					elevation={0}
					sx={{
						width: 'fit-content',
						borderRadius: '50%',
						p: 0.5,
					}}
				>
					<LoadingAvatar />
				</Paper>
			</Stack>
			<Loading />
		</Stack>
	);
}
