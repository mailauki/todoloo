'use client';
import React from 'react';
import { Add } from '@mui/icons-material';
import { IconButton, InputAdornment, Paper, TextField } from '@mui/material';
import { updateTodo } from './actions';
import type { Todo } from '@/utils/types';
import moment from 'moment';

export default function EditTodo({
	handleCloseEdit,
	todo,
}: {
	handleCloseEdit: () => void,
	todo: Todo,
}) {
  const [newTaskText, setNewTaskText] = React.useState(todo.task||'');
	// const today = new Date().toISOString().substring(0, 10);
	const today = moment().format('YYYY-MM-DD');
  const [newTaskDueDate, setNewTaskDueDate] = React.useState(todo.due_date||today);

	return (
		<>
			<Paper
				component='form'
				elevation={0}
				onSubmit={(event) => {
					event.preventDefault();
					updateTodo({ taskText: newTaskText, dueDate: newTaskDueDate, id: todo.id })
					.finally(() => setNewTaskText(''));
					handleCloseEdit();
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
