import type { UUID } from 'crypto';

export interface Todo {
	id: number,
	user_id: UUID,
	task: string,
	created_at: Date,
}
