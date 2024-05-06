'use client';
import React from 'react';
import { Add } from '@mui/icons-material';
import { IconButton, InputAdornment, Paper, TextField } from '@mui/material';
import { addTodo } from './actions';

export default function AddTodo() {
  const [newTaskText, setNewTaskText] = React.useState('');

	return (
		<>
			<Paper
				component='form'
				elevation={0}
				onSubmit={(event) => {
					event.preventDefault();
					addTodo(newTaskText)
					.finally(() => setNewTaskText(''));
				}}
				sx={{ backgroundColor: 'transparent' }}
			>
				<TextField
					InputProps={{
						endAdornment: <InputAdornment position='end'>
							<IconButton size='small' type='submit'>
								<Add fontSize='small' />
							</IconButton>
						</InputAdornment>,
					}}
					fullWidth
					label='Add New Todo'
					margin='normal'
					onChange={(e) => {
						setNewTaskText(e.target.value);
					}}
					// size='small'
					type='text'
					value={newTaskText}
				/>
			</Paper>
		</>
	);
}
