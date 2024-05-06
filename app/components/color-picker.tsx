import React from 'react';
import { Box, ButtonBase, FormControl, Radio, RadioGroup, Tooltip, styled } from '@mui/material';
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

const ColorBox = styled(Box)(({ color }: { color: string }) => ({
	backgroundColor: color,
	height: 30,
	width: color === grey[shade] ? 126 : 30,
}));

export default function ColorPicker({
	color,
	onColorChange,
}: {
	color: string | null,
  onColorChange: (color_code: string) => void
}) {
  // const [shade, setShade] = React.useState<number|string>(500);
  const [value, setValue] = React.useState<string|null>(blue[shade]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
		onColorChange((event.target as HTMLInputElement).value);
		console.log((event.target as HTMLInputElement).value);
  };

	React.useEffect(() => {
		if (color) setValue(color);
	}, [color]);

	function Color({ color, label }: { color: string, label: string }) {
		return (
			<Tooltip placement='right' title={label}>
				<ColorButton>
					<Radio
						checked={value === label}
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
					<ColorBox color={color} />
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
				>
					<Box width={128} >
						<Color color={red[shade]} label='red' />
						<Color color={pink[shade]} label='pink' />
						<Color color={purple[shade]} label='purple' />
						<Color color={deepPurple[shade]} label='deep purple' />
						<Color color={indigo[shade]} label='indigo' />
						<Color color={blue[shade]} label='blue' />
						<Color color={lightBlue[shade]} label='light blue' />
						<Color color={cyan[shade]} label='cyan' />
						<Color color={teal[shade]} label='teal' />
						<Color color={green[shade]} label='green' />
						<Color color={lightGreen[shade]} label='light green' />
						<Color color={lime[shade]} label='lime' />
						<Color color={yellow[shade]} label='yellow' />
						<Color color={amber[shade]} label='amber' />
						<Color color={orange[shade]} label='orange' />
						<Color color={deepOrange[shade]} label='deep orange' />
						<Color color={grey[shade]} label='grey' />
					</Box>
				</RadioGroup>
			</FormControl>
		</>
	);
}
