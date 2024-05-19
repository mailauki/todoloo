import type { UUID } from 'crypto';

export interface Todo {
	id: number,
	user_id: UUID,
	task: string,
	is_complete: boolean,
	due_date: Date | string,
	created_at?: Date,
	show_dates?: boolean,
}

export interface Profile {
	id: UUID,
	full_name?: string,
	username: string,
	avatar_url?: string,
	color?: string,
	updated_at?: Date,
	settings?: Settings,
}

export interface Settings {
	id: number,
	user_id?: UUID,
	profile_id?: UUID,
	theme_mode: string,
	show_dates: boolean,
	show_welcome: boolean,
	created_at?: Date,
}

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	public: {
		Tables: {
			todos: {
				// Row: Todo
				Row: {
          // the data expected from .select()
          id: number
          name: string
          data: Json | null
        }
        Insert: {
          // the data to be passed to .insert()
          id?: never // generated columns must not be supplied
          name: string // `not null` columns with no default must be supplied
          data?: Json | null // nullable columns can be omitted
        }
        Update: {
          // the data to be passed to .update()
          id?: never
          name?: string // `not null` columns are optional on .update()
          data?: Json | null
        }
			},
			profiles: {
				// Row: Profile
				Row: {
          // the data expected from .select()
          id: number
          name: string
          data: Json | null
        }
        Insert: {
          // the data to be passed to .insert()
          id?: never // generated columns must not be supplied
          name: string // `not null` columns with no default must be supplied
          data?: Json | null // nullable columns can be omitted
        }
        Update: {
          // the data to be passed to .update()
          id?: never
          name?: string // `not null` columns are optional on .update()
          data?: Json | null
        }
			},
			settings: {
				// Row: Settings
				Row: {
          // the data expected from .select()
          id: number
          name: string
          data: Json | null
        }
        Insert: {
          // the data to be passed to .insert()
          id?: never // generated columns must not be supplied
          name: string // `not null` columns with no default must be supplied
          data?: Json | null // nullable columns can be omitted
        }
        Update: {
          // the data to be passed to .update()
          id?: never
          name?: string // `not null` columns are optional on .update()
          data?: Json | null
        }
			},
		}
	}
}
