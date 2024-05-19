'use client';
import { Card, CardContent, CardHeader, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Switch } from '@mui/material';
import { updateSettings } from '@/app/account/actions';
import { AccessTime, CalendarToday } from '@mui/icons-material';
import { useState } from 'react';
import type { Settings } from '@/app/_utils/types';

export default function ProfileSettings({
	settings,
}: {
	settings: Settings,
}) {
	const showDates = settings?.show_dates || true;
	// const [showDates, setShowDates] = useState<boolean>(profile.settings?.show_dates||true);
	const [showWelcome, setShowWelcome] = useState<boolean>(true);

	return (
		<Stack spacing={2}>
			<Card
				elevation={0}
				sx={{
					backgroundColor: 'card.paper',
				}}
			>
				<CardHeader
					sx={{ textAlign: 'center' }}
					title='App Settings'
				/>
				<List
					component={CardContent}
					disablePadding
				>
					<ListItem
						disablePadding
						secondaryAction={
							<Switch
								checked={showDates}
								edge='end'
								inputProps={{
									'aria-label': 'Show dates',
								}}
								onChange={() => {
									// setShowDates(!showDates);
									// handleShowDates({showDates: settings!.show_dates});
									// updateSettings({showDates: profile.settings!.show_dates});
									updateSettings({showDates});
								}}
							/>
						}
					>
						<ListItemButton
							onClick={() => {
								// setShowDates(!showDates);
								// handleShowDates({showDates: settings!.show_dates});
								// updateSettings({showDates: profile.settings!.show_dates});
								updateSettings({showDates});
							}}
						>
							<ListItemIcon>
								<CalendarToday />
							</ListItemIcon>
							<ListItemText primary='Show Dates' />
						</ListItemButton>
					</ListItem>
					<ListItem
						disablePadding
						secondaryAction={
							<Switch
								checked={showWelcome}
								edge='end'
								inputProps={{
									'aria-label': 'Show welcome',
								}}
								onChange={() => {
									setShowWelcome(!showWelcome);
								}}
							/>
						}
					>
						<ListItemButton
							onClick={() => {
								setShowWelcome(!showWelcome);
							}}
						>
							<ListItemIcon>
								<AccessTime />
							</ListItemIcon>
							<ListItemText primary='Show Welcome' />
						</ListItemButton>
					</ListItem>
				</List>
			</Card>
		</Stack>
	);
}
