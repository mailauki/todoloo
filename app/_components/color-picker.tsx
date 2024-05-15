import React, { useEffect } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, styled, useTheme } from '@mui/material';
import { amber, blue, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow } from '@mui/material/colors';
import { Check } from '@mui/icons-material';
import { updateColor } from '../account/actions';

const shade = 500;

const ColorBox = styled(Box)(({ color }: { color: string }) => ({
	backgroundColor: color,
	height: 30,
	width: 30,
}));

export default function ColorPicker({
	color,
}: {
	color: string|null,
}) {
	const theme = useTheme();
  // const [shade, setShade] = React.useState<number|string>(500);
  const [value, setValue] = React.useState<string|null>(color||grey[shade]);

	useEffect(() => {
		if (color || color !== value) setValue(color);
	}, [color, value]);

	function Color({
		hexcolor, label,
	}: {
		hexcolor: string,
		label: string,
	}) {
		return (
			// <ListItem
			// 	disablePadding
			// 	secondaryAction={
			// 		value === label && <Check sx={{ mr: 1 }} />
			// 	}
			// >
			// 	<ListItemButton
			// 		component={FormControlLabel}
			// 		control={
			// 			<Radio
			// 				checkedIcon={<ColorBox color={hexcolor} />}
			// 				icon={<ColorBox color={hexcolor} />}
			// 			/>
			// 		}
			// 		label={
			// 			<Typography
			// 				sx={{ ml: 2 }}
			// 				variant='button'
			// 			>
			// 				{label}
			// 			</Typography>
			// 		}
			// 		selected={value === label}
			// 		value={label}
			// 	/>
			// </ListItem>

			// <ListItem
			// 	action={updateColor}
			// 	component='form'
			// 	disablePadding
			// 	method='post'
			// 	secondaryAction={
			// 		value === label && <Check sx={{ mr: 1 }} />
			// 	}
			// >
			// 	<ListItemButton
			// 		component='button'
			// 		selected={value === label}
			// 		sx={{ py: 2, pl: 3 }}
			// 		type='submit'
			// 	>
			// 		<ListItemIcon>
			// 			<ColorBox color={hexcolor} />
			// 		</ListItemIcon>
			// 		<ListItemText primary={label} />
			// 	</ListItemButton>
			// </ListItem>

			<ListItem
				action={updateColor}
				component='form'
				disablePadding
				method='post'
				secondaryAction={
					value === label && <Check sx={{ mr: 1 }} />
				}
			>
				<ListItemButton
					component='button'
					// onClick={() => setValue(label)}
					selected={value === label}
					sx={{ py: 2, pl: 3 }}
					type='submit'
				>
					<input
						id='color'
						name='color'
						style={{
							visibility: 'hidden',
							position: 'absolute',
						}}
						value={label}
					/>
					<ListItemIcon>
						<ColorBox color={hexcolor} />
					</ListItemIcon>
					<ListItemText primary={<Typography variant='button'>{label}</Typography>} />
				</ListItemButton>
			</ListItem>
		);
	}

	return (
		// <form>
		// 	<FormControl sx={{ width: '100%' }}>
		// 		<List
		// 			component={RadioGroup}
		// 			disablePadding
		// 			id='color'
		// 			name='color'
		// 			onChange={handleChange}
		// 			value={value}
		// 		>
		// 			<Color hexcolor={red[shade]} label='red' />
		// 			<Color hexcolor={pink[shade]} label='pink' />
		// 			<Color hexcolor={purple[shade]} label='purple' />
		// 			<Color hexcolor={deepPurple[shade]} label='deep purple' />
		// 			<Color hexcolor={indigo[shade]} label='indigo' />
		// 			<Color hexcolor={blue[shade]} label='blue' />
		// 			<Color hexcolor={lightBlue[shade]} label='light blue' />
		// 			<Color hexcolor={cyan[shade]} label='cyan' />
		// 			<Color hexcolor={teal[shade]} label='teal' />
		// 			<Color hexcolor={green[shade]} label='green' />
		// 			<Color hexcolor={lightGreen[shade]} label='light green' />
		// 			<Color hexcolor={lime[shade]} label='lime' />
		// 			<Color hexcolor={yellow[shade]} label='yellow' />
		// 			<Color hexcolor={amber[shade]} label='amber' />
		// 			<Color hexcolor={orange[shade]} label='orange' />
		// 			<Color hexcolor={deepOrange[shade]} label='deep orange' />
		// 			<Color hexcolor={grey[shade]} label='grey' />
		// 			<Color hexcolor={theme.palette.text.primary} label='black/white' />
		// 		</List>
		// 		<Button
		// 			formAction={updateColor}
		// 			size='large'
		// 			sx={{ m: 2 }}
		// 			type='submit'
		// 			variant='contained'
		// 		>
		// 			Update Color
		// 		</Button>
		// 	</FormControl>
		// </form>
		<List disablePadding>
			<Color hexcolor={red[shade]} label='red' />
			<Color hexcolor={pink[shade]} label='pink' />
			<Color hexcolor={purple[shade]} label='purple' />
			<Color hexcolor={deepPurple[shade]} label='deep purple' />
			<Color hexcolor={indigo[shade]} label='indigo' />
			<Color hexcolor={blue[shade]} label='blue' />
			<Color hexcolor={lightBlue[shade]} label='light blue' />
			<Color hexcolor={cyan[shade]} label='cyan' />
			<Color hexcolor={teal[shade]} label='teal' />
			<Color hexcolor={green[shade]} label='green' />
			<Color hexcolor={lightGreen[shade]} label='light green' />
			<Color hexcolor={lime[shade]} label='lime' />
			<Color hexcolor={yellow[shade]} label='yellow' />
			<Color hexcolor={amber[shade]} label='amber' />
			<Color hexcolor={orange[shade]} label='orange' />
			<Color hexcolor={deepOrange[shade]} label='deep orange' />
			<Color hexcolor={grey[shade]} label='grey' />
			<Color hexcolor={theme.palette.text.primary} label='black/white' />
	</List>
	);
}
