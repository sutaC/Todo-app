import { writable, type Writable } from "svelte/store";

export interface TodoItem {
	id: number;
	active: boolean;
	title: string;
}

export const todos: Writable<Array<TodoItem>> = writable([
	{
		id: 1,
		active: true,
		title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, ex.",
	},
	{
		id: 2,
		active: true,
		title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, ex.",
	},
	{
		id: 3,
		active: true,
		title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, ex.",
	},
]);
