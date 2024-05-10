'use client';
import React from 'react';
import { useOpen } from '@/utils/context';
import { Add, Close } from '@mui/icons-material';
import { Container, Drawer, Fab, Toolbar } from '@mui/material';
import { usePathname } from 'next/navigation';

export default function BottomDrawer({
	children,
}: Readonly<{
  children: React.ReactNode,
}>) {
	const pathname = usePathname();
	const [value, setValue] = React.useState(pathname || '/');
	const { openTodoEdit, setOpenTodoEdit, openTodoAdd, setOpenTodoAdd, setSelectedTodo } = useOpen();

	React.useEffect(() => {
		if (pathname !== value) {
			setValue(pathname);
		}
	}, [pathname, value]);

	const handleClick = () => {
		if (openTodoEdit) {
			setOpenTodoEdit(false);
			setSelectedTodo(null);
		} else if (openTodoAdd) setOpenTodoAdd(false);
		else setOpenTodoAdd(true);
	};

	const handleCloseDrawer = () => {
		if (openTodoEdit) {
			setOpenTodoEdit(false);
			setSelectedTodo(null);
		} else if (openTodoAdd) setOpenTodoAdd(false);
	};

	return (
		<>
			<Fab
				aria-label={openTodoAdd||openTodoEdit ? 'close' : 'add todo'}
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
				{openTodoAdd||openTodoEdit ? <Close /> : <Add />}
			</Fab>
			<Drawer
				anchor='bottom'
				onClose={handleCloseDrawer}
				open={openTodoAdd||openTodoEdit}
				sx={{
					zIndex: (theme) => theme.zIndex.fab - 1,
				}}
			>
				<Container maxWidth='sm' sx={{ my: 2 }}>
					{children}
					<Toolbar sx={{ mt: 6 }} />
				</Container>
			</Drawer>
		</>
	);
}
