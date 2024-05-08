import type { UUID } from 'crypto';

export interface Todo {
	id: number,
	user_id: UUID,
	task: string,
	is_complete: boolean,
	due_date: Date | string,
	created_at: Date,
}

export interface Profile {
	id: UUID,
	full_name: string,
	username: string,
	avatar_url: string,
	color: string,
}
