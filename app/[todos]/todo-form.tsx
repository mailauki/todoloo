'use client';
import { IconButton, InputAdornment, Paper, TextField, useTheme } from '@mui/material';
import { useOpen } from '@/utils/context';
import React from 'react';
import { addTodo, updateTodo } from './actions';
import moment from 'moment';
import { Add } from '@mui/icons-material';

export default function TodoForm() {
	const theme = useTheme();
	const { openTodoEdit, setOpenTodoEdit, selectedTodo, setOpenTodoAdd } = useOpen();
  const [newTaskText, setNewTaskText] = React.useState(selectedTodo?.task||'');
	const today = moment().format('YYYY-MM-DD');
  const [newTaskDueDate, setNewTaskDueDate] = React.useState(selectedTodo?.due_date||today);

	const handleAddToo = (event: React.FormEvent) => {
		event.preventDefault();
		addTodo({ taskText: newTaskText, dueDate: newTaskDueDate })
		.finally(() => {
			setNewTaskText('');
			setOpenTodoAdd(false);
		});
	};
	const handleEditTodo = (event: React.FormEvent) => {
		event.preventDefault();
		updateTodo({
			taskText: newTaskText,
			dueDate: newTaskDueDate,
			id: selectedTodo!.id,
		})
		.finally(() => {
			setNewTaskText('');
			setOpenTodoEdit(false);
		});
	};

	return (
		<Paper
			component='form'
			elevation={0}
			onSubmit={openTodoEdit ? handleEditTodo : handleAddToo}
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
				label={openTodoEdit ? 'Edit Todo' : 'Add New Todo'}
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
				sx={{
					'& input': {
						pr: 2.5,
						textAlign: 'left',
						colorScheme: theme.palette.mode === 'dark' ? 'dark' : 'light',
					},
					'& input::-webkit-date-and-time-value': {
						textAlign: 'left',
					},
				}}
				type='date'
				value={newTaskDueDate}
			/>
		</Paper>
	);
}
