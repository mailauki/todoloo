'use client';
import React from 'react';
import { BottomNavigation, BottomNavigationAction, Fab, Paper, Typography, styled } from '@mui/material';
import { Add, Check, Person } from '@mui/icons-material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
// import TodoForm from './[todos]/todo-form';
import BottomDrawer from './bottom-drawer';
import AddTodo from '../[todos]/add-todo';

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
	// backgroundColor: 'tertiary.main',
});

export default function BottomNav() {
	const pathname = usePathname();
  const [value, setValue] = React.useState(pathname || '/');
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		if (pathname !== value) {
			setValue(pathname);
		}
	}, [pathname, value]);

	const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	return (
		<>
			<Paper
				elevation={10}
				square
				sx={{
					position: 'fixed',
					bottom: 0,
					left: 0,
					right: 0,
					// zIndex: (theme) => theme.zIndex.appBar,
					zIndex: (theme) => theme.zIndex.drawer + 1,
				}}
				// variant='outlined'
			>
				<BottomNavigation
					color='secondary'
					showLabels
					sx={{
						justifyContent: 'space-evenly',
						py: 0.25,
						// backgroundColor: 'primary.lighter',
					}}
					value={value}
				>
					<BottomNavigationAction
						component={Link}
						href='/'
						icon={
							// <Paper
							// 	elevation={0}
							// 	sx={{
							// 		backgroundColor: value=== '/' ? 'primary.light' : 'transparent',
							// 		paddingX: 2,
							// 		height: '24px',
							// 	}}
							// >
							// 	<Check />
							// </Paper>
							<Check />
						}
						label={
							<Typography variant='caption'>
								ToDo
							</Typography>
						}
						value='/'
					/>
					<StyledFab
						aria-label='add todo'
						color='secondary'
						onClick={handleClickOpen}
						sx={{
							display: value === '/' ? 'inline-flex': 'none',
							// backgroundColor: (theme) => theme.palette.tertiary.main,
						}}
					>
						<Add />
					</StyledFab>
					<BottomNavigationAction
						component={Link}
						href='/account'
						icon={
							// <Paper
							// 	elevation={0}
							// 	sx={{
							// 		backgroundColor: value=== '/account' ? 'primary.light' : 'transparent',
							// 		paddingX: 2,
							// 		height: '24px',
							// 	}}
							// >
							// 	<Person />
							// </Paper>
							<Person />
						}
						label={
							<Typography variant='caption'>
								Account
							</Typography>
						}
						value='/account'
					/>
				</BottomNavigation>
			</Paper>

			<BottomDrawer handleClose={handleClose} open={open}>
				<AddTodo handleClose={handleClose} />
			</BottomDrawer>
		</>
	);
}
