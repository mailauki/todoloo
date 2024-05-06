'use client';
import React from 'react';
import { Add } from '@mui/icons-material';
import { IconButton, InputAdornment, Paper, TextField } from '@mui/material';
import { addTodo } from './actions';

export default function AddTodo() {
  const [newTaskText, setNewTaskText] = React.useState('');
	const today = new Date().toISOString().substring(0, 10);
  const [newTaskDueDate, setNewTaskDueDate] = React.useState(today);

	return (
		<>
			<Paper
				component='form'
				elevation={0}
				onSubmit={(event) => {
					event.preventDefault();
					addTodo({ taskText: newTaskText, dueDate: newTaskDueDate })
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
					type='text'
					value={newTaskText}
				/>
				<TextField
					fullWidth
					label='Due Date'
					margin='normal'
					onChange={(e) => {
						setNewTaskDueDate(e.target.value);
					}}
					placeholder='mm/dd/yyyy'
					sx={{ '& input': { pr: 2.5, textAlign: 'left' } }}
					type='date'
					value={newTaskDueDate}
				/>
			</Paper>
		</>
	);
}
