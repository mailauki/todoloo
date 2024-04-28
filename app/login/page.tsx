'use client';

import * as React from 'react';

import { Button, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { login, signup } from './actions';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Main from '../components/main';

export default function LoginPage() {
	const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
		<Main>
			<Stack
				component='form'
				spacing={2}
			>
				<TextField
					fullWidth
					id='email'
					label='Email'
					name='email'
					required
					type='email'
				/>
				<TextField
					InputProps={{
						endAdornment: <InputAdornment position='end'>
							<IconButton
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
							>
								{showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>,
					}}
					fullWidth
					id='password'
					label='Password'
					name='password'
					required
					type={showPassword ? 'text' : 'password'}
				/>
				<Button
					formAction={login}
					size='large'
					type='submit'
					variant='contained'
				>
					Log in
				</Button>
				<Button
					formAction={signup}
					size='large'
					type='submit'
					variant='outlined'
				>
					Sign up
				</Button>
			</Stack>
		</Main>
  );
}
