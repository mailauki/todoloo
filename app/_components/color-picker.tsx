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
	color: string | null,
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
		<List disablePadding>
			<Color hexcolor={red[shade]} label='Red' />
			<Color hexcolor={pink[shade]} label='Pink' />
			<Color hexcolor={purple[shade]} label='Purple' />
			<Color hexcolor={deepPurple[shade]} label='Deep Purple' />
			<Color hexcolor={indigo[shade]} label='Indigo' />
			<Color hexcolor={blue[shade]} label='Blue' />
			<Color hexcolor={lightBlue[shade]} label='Light Blue' />
			<Color hexcolor={cyan[shade]} label='Cyan' />
			<Color hexcolor={teal[shade]} label='Teal' />
			<Color hexcolor={green[shade]} label='Green' />
			<Color hexcolor={lightGreen[shade]} label='Light Green' />
			<Color hexcolor={lime[shade]} label='Lime' />
			<Color hexcolor={yellow[shade]} label='Yellow' />
			<Color hexcolor={amber[shade]} label='Amber' />
			<Color hexcolor={orange[shade]} label='Orange' />
			<Color hexcolor={deepOrange[shade]} label='Deep Orange' />
			<Color hexcolor={grey[shade]} label='Grey' />
			<Color hexcolor={theme.palette.text.primary} label='Black / White' />
	</List>
	);
}
