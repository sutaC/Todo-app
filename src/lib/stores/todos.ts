import { writable, type Writable } from "svelte/store";

export interface TodoItem {
	id: number;
	active: boolean;
	title: string;
}

export const todos: Writable<Array<TodoItem>> = writable([]);
