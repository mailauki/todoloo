import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, ToggleButton, ToggleButtonGroup, styled, useTheme } from '@mui/material';
import { amber, blue, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow } from '@mui/material/colors';
import { Check } from '@mui/icons-material';

const shade = 500;

const ColorBox = styled(Box)(({ color }: { color: string }) => ({
	backgroundColor: color,
	height: 30,
	width: 30,
}));

export default function ColorPicker({
	color,
	onColorChange,
}: {
	color: string|null,
  onColorChange: (color: string|null) => void
}) {
	const theme = useTheme();
  // const [shade, setShade] = React.useState<number|string>(500);
  const [value, setValue] = React.useState<string|null>(color||grey[shade]);

	const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string|null,
  ) => {
		setValue(newValue);
    onColorChange(newValue);
  };

	function Color({
		hexcolor, label,
	}: {
		hexcolor: string,
		label: string,
	}) {
		return (

			<ListItem
				disablePadding
				secondaryAction={
					value === label && <Check />
				}
			>
				<ToggleButton
					aria-label={label}
					sx={{
						px: 3,
						textAlign: 'left',
						width: '100%',
					}}
					value={label}
				>
					<ListItemIcon>
						<ColorBox color={hexcolor} />
					</ListItemIcon>
					<ListItemText primary={label} />
				</ToggleButton>
			</ListItem>
		);
	}

	return (
		<>
			<List
				component={ToggleButtonGroup}
				exclusive
				onChange={handleChange}
				orientation='vertical'
				sx={{ width: '100%' }}
				value={value}
			>
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
		</>
	);
}
