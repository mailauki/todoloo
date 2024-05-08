import React from 'react';
import { Box, ButtonBase, FormControl, Radio, RadioGroup, Tooltip, styled, useTheme } from '@mui/material';
import type { Theme } from '@mui/material';
import { amber, blue, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow } from '@mui/material/colors';
import { Check } from '@mui/icons-material';

const shade = 500;

const ColorButton = styled(ButtonBase)(({ theme }) => ({
	border: '1px solid',
	borderColor: 'transparent',
	'&:hover, &.Mui-focusVisible': {
		borderColor: theme.palette.text.primary,
	},
}));

const ColorBox = styled(Box)(({ color, theme }: { color: string, theme: Theme }) => ({
	backgroundColor: color,
	height: 30,
	// width: color === grey[shade] ? 126 : 30,
	width: color === grey[shade] || color === theme.palette.text.primary ? 62 : 30,
}));

export default function ColorPicker({
	color,
	onColorChange,
}: {
	color: string | null,
  onColorChange: (color: string) => void
}) {
	const theme = useTheme();
  // const [shade, setShade] = React.useState<number|string>(500);
  const [value, setValue] = React.useState<string|null>(color||grey[shade]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
		onColorChange((event.target as HTMLInputElement).value);
		console.log(event);
  };

	// React.useEffect(() => {
	// 	if (color) setValue(color);
	// }, [color]);

	function Color({ hexcolor, label }: { hexcolor: string, label: string }) {
		return (
			<Tooltip placement='right' title={label}>
				<ColorButton>
					<Radio
						checked={value === label}
						// checked={color === label}
						checkedIcon={<Check />}
						color='default'
						disableRipple
						icon={<></>}
						inputProps={{ 'aria-label': label }}
						name='radio-buttons'
						onChange={handleChange}
						sx={{ position: 'absolute' }}
						value={label}
					/>
					<ColorBox color={hexcolor} theme={theme} />
				</ColorButton>
			</Tooltip>
		);
	}

	return (
		<>
			<FormControl>
				<RadioGroup
					aria-label='Color Picker'
					name='color-radio-buttons-group'
					onChange={handleChange}
					value={value}
					// value={color}
				>
					<Box width={128} >
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
					</Box>
				</RadioGroup>
			</FormControl>
		</>
	);
}
