'use client';
import { Card, CardContent, CardHeader, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Switch } from '@mui/material';
import { updateSettings } from '@/app/account/actions';
import { AccessTime, CalendarToday } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import type { Settings } from '@/app/_utils/types';
import { createClient } from '@/app/_utils/supabase/client';

export default function ProfileSettings({
	settings,
}: {
	settings: Settings,
}) {
	const supabase = createClient();

	const [showDates, setShowDates] = useState<boolean>(settings.show_dates ?? true);
	const [showWelcome, setShowWelcome] = useState<boolean>(settings.show_welcome ?? true);

	useEffect(() => {
		const channel = supabase.channel('realtime settings')
		.on('postgres_changes', {
			event: 'UPDATE',
			schema: 'public',
			table: 'settings',
		}, (payload) => {
			setShowDates(payload.new.show_dates as boolean);
			setShowWelcome(payload.new.show_welcome as boolean);
		})
		.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	});

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
									updateSettings({showDates});
								}}
							/>
						}
					>
						<ListItemButton
							onClick={() => {
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
									updateSettings({showWelcome});
								}}
							/>
						}
					>
						<ListItemButton
							onClick={() => {
								updateSettings({showWelcome});
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
