'use client';
import React from 'react';
import { Button, IconButton, InputAdornment, Link as Anchor, Stack, TextField, Typography, Alert, Card, CardContent } from '@mui/material';
import { login, signup } from './actions';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Main from '../_components/main';

export default function LoginPage() {
	const error = new URL(document.location.href).searchParams.get('error');
	const [showPassword, setShowPassword] = React.useState(false);
	const [showSignup, setShowSignup] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClickShowSignup = () => setShowSignup((show) => !show);

  return (
		<Main>
			{error && <Alert severity='error'sx={{ mb: 2 }}>{error}</Alert>}
			<Card
				elevation={0}
				sx={{
					backgroundColor: 'card.paper',
				}}
			>
				<CardContent>
					<Stack
						component='form'
						spacing={2}
					>
						<TextField
							// error={Boolean(error)}
							autoComplete='off'
							autoFocus={false}
							fullWidth
							id='email'
							label='Email'
							name='email'
							required
							type='email'
							variant='standard'
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
							autoComplete='off'
							autoFocus={false}
							// error={Boolean(error)}
							fullWidth
							id='password'
							label='Password'
							name='password'
							required
							type={showPassword ? 'text' : 'password'}
							variant='standard'
						/>
						{!showSignup ? (
							<>
								<Button
									formAction={login}
									size='large'
									type='submit'
									variant='contained'
								>
									Login
								</Button>
								<Typography align='center'>
									Don&apos;t have an account?
									{' '}
									<Anchor
										color='inherit'
										component='button'
										onClick={handleClickShowSignup}
									>
										Sign Up Now
									</Anchor>
								</Typography>
							</>
						) : (
							<>
								{/* <TextField
									fullWidth
									id='username'
									label='Username'
									name='username'
									type='text'
								/> */}
								<Button
									formAction={signup}
									size='large'
									type='submit'
									variant='contained'
								>
									Sign up
								</Button>
								<Typography align='center'>
									Already have an account?
									{' '}
									<Anchor
										color='inherit'
										component='button'
										onClick={handleClickShowSignup}
									>
										Login
									</Anchor>
								</Typography>
							</>
						)}
					</Stack>
				</CardContent>
			</Card>
		</Main>
  );
}
