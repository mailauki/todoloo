'use client';

import * as React from 'react';

import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Check, Person } from '@mui/icons-material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function BottomNav() {
	const pathname = usePathname();
  const [value, setValue] = React.useState(pathname || '/');

	React.useEffect(() => {
		if (pathname !== value) {
			setValue(pathname);
		}
	}, [pathname, value]);

	return (
		<Paper
			elevation={3}
			square
			sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
			// variant='outlined'
		>
			<BottomNavigation
				showLabels
				sx={{
					justifyContent: 'space-evenly',
				}}
				value={value}
			>
				<BottomNavigationAction
					component={Link}
					href='/'
					icon={<Check />}
					label='ToDos'
					value='/'
				/>
				<BottomNavigationAction
					component={Link}
					href='/account'
					icon={<Person />}
					label='Account'
					value='/account'
				/>
			</BottomNavigation>
		</Paper>
	);
}
