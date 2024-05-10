'use client';
import React from 'react';
import { Fab} from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import { usePathname } from 'next/navigation';
// import Link from 'next/link';
// import TodoForm from './[todos]/todo-form';
import BottomDrawer from './bottom-drawer';
import AddTodo from '../[todos]/add-todo';

// const StyledFab = styled(Fab)({
//   position: 'absolute',
//   zIndex: 1,
//   top: -30,
//   left: 0,
//   right: 0,
//   margin: '0 auto',
// });

export default function BottomNav() {
	const pathname = usePathname();
  const [value, setValue] = React.useState(pathname || '/');
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		if (pathname !== value) {
			setValue(pathname);
		}
	}, [pathname, value]);

	const handleClick = () => {
    setOpen(!open);
  };

	// const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

	return (
		<>
			<Fab
				aria-label={open ? 'close' : 'add todo'}
				color='secondary'
				// color='inherit'
				onClick={handleClick}
				sx={{
					display: value === '/' ? 'inline-flex': 'none',
					position: 'absolute',
					top: 'auto',
					bottom: 50,
					left: 0,
					right: 0,
					margin: '0 auto',
				}}
			>
				{open ? <Close /> : <Add />}
			</Fab>

			<BottomDrawer handleClose={handleClose} open={open}>
				<AddTodo handleClose={handleClose} />
			</BottomDrawer>
		</>
	);
}
