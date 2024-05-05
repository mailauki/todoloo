import type { UUID } from 'crypto';

export interface Todo {
	id: number,
	user_id: UUID,
	task: string,
	is_complete: boolean,
	created_at: Date,
}
