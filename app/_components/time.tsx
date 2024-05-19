'use client';
import { Stack, Typography } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';

export default function Time() {
	const [time, setTime] = useState(moment().format('h:mm'));
	const [seconds, setSec] = useState(moment().format('ss'));
	const [am, setAm] = useState(moment().format('a'));

	const timer = setTimeout(() => {
		setTime(moment().format('h:mm'));
		setSec(moment().format('ss'));
		setAm(moment().format('a'));
	}, 1000);
	useEffect(() => {
		return () => {
			clearTimeout(timer);
		};
	}, [timer]);
	return (
		<Stack
			alignItems='center'
			direction='row'
			justifyContent='center'
			spacing={1}
		>
			<Typography variant='h3'>
				{time}
			</Typography>

			<Stack
				alignItems='center'
				justifyContent='center'
				sx={{ textAlign: 'center' }}
			>
				<Typography
					color='text.secondary'
					component='span'
					sx={{ lineHeight: 1.5 }}
					variant='subtitle1'
				>
					{seconds}
				</Typography>
				<Typography
					color='text.secondary'
					component='span'
					sx={{ lineHeight: 1.5 }}
					variant='button'
				>
					{am}
				</Typography>
			</Stack>
		</Stack>
	);
}
