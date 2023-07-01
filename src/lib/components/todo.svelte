<script lang="ts">
	import CustomCheckbox from "$lib/components/customCheckbox.svelte";
	import { todos, type TodoItem } from "$lib/stores/todos";

	export let todo: TodoItem;

	let checked = !todo.active;

	// Todo Functions
	const changeActive = () => {
		let newTds = $todos;
		let newTd = newTds.find((td) => td.id === todo.id);
		if (newTd) {
			newTd.active = !checked;
			todos.update(() => newTds);
		}
	};

	const deleteTodo = () => {
		todos.update((tds) => tds.filter((td) => td.id !== todo.id));
	};

	// Drag & Drop
	let dragged = false;

	const handleDragStart = (event: DragEvent) => {
		dragged = true;
		if (event.target instanceof Element) {
			event.dataTransfer?.setData("text/plain", event.target.id);
		}
	};
</script>

<div
	class="todo"
	class:checked
	class:dragged
	id={todo.id.toString()}
	draggable="true"
	on:dragstart={(e) => handleDragStart(e)}
	on:dragend={() => (dragged = false)}
>
	<CustomCheckbox
		bind:checked
		on:change={() => {
			changeActive();
		}}
	/>

	<p>{todo.title}</p>
	<button
		class="todo-detete"
		aria-label="Delete todo"
		on:click={() => {
			deleteTodo();
		}}
	/>
</div>

<style>
	.todo {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75em;

		padding: 1em;

		border-bottom: 1px solid var(--clr-neutral-75);
	}

	p {
		margin: 0;
		font-size: 0.7rem;
		width: 100%;
		cursor: default;
		overflow-x: hidden;
		word-wrap: break-word;
	}
	p:hover {
		opacity: 0.8;
	}

	button {
		border: none;
		background-color: transparent;
		background: url("/images/icon-cross.svg") no-repeat center;
		background-size: cover;

		width: 1rem;
		height: 1rem;

		cursor: pointer;
	}

	/* Events */

	.checked p {
		opacity: 0.25;
		text-decoration: line-through;
	}

	.dragged {
		opacity: 0.5;
	}

	/* Desktop view */

	@media (width >= 600px) {
		button {
			visibility: hidden;
		}

		.todo:hover > button {
			visibility: visible;
		}
	}
</style>
