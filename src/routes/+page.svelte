<script lang="ts">
	import CustomCheckbox from "$lib/components/customCheckbox.svelte";
	import Todo from "$lib/components/todo.svelte";
	import { todos, type TodoItem } from "$lib/stores/todos";
	import type { is_empty } from "svelte/internal";

	let filter: "all" | "active" | "completed" = "all";

	// Theme save
	let darkTheme: boolean = false;
	try {
		darkTheme = JSON.parse(localStorage.getItem("dark-theme") ?? "false");
	} catch (error) {
		console.error(error);
	}
	$: localStorage.setItem("dark-theme", JSON.stringify(darkTheme));

	// Todos save
	try {
		todos.set(JSON.parse(localStorage.getItem("todos") ?? "[]"));
	} catch (error) {
		console.error(error);
	}
	$: localStorage.setItem("todos", JSON.stringify($todos));

	// Todo Functions
	const clearDoneTds = () => {
		todos.update((tds) => tds.filter((td) => td.active));
	};

	let newTdTitle = "";
	const addNewTd = (event: Event) => {
		event.preventDefault();

		try {
			const newTd: TodoItem = {
				id: Math.random(),
				active: true,
				title: newTdTitle,
			};

			todos.update((tds) => [newTd, ...tds]);

			newTdTitle = "";
		} catch (error) {
			console.error(error);
		}
	};

	// Drag & Drop
	const handleDrop = (event: DragEvent) => {
		event.preventDefault();

		const sourceId = Number(event.dataTransfer?.getData("text/plain"));

		if (typeof sourceId === "number" && event.target instanceof Element) {
			const targetId =
				event.target.id.length > 0
					? Number(event.target.id)
					: Number(event.target.parentElement?.id);

			const sourceIndex = $todos.findIndex((td) => td.id === sourceId);
			const targetIndex = $todos.findIndex((td) => td.id === targetId);

			let newTds = $todos;

			const tmp = $todos[targetIndex];
			newTds[targetIndex] = $todos[sourceIndex];
			newTds[sourceIndex] = tmp;

			todos.set(newTds);
		}
	};
</script>

<svelte:head>
	{#if darkTheme}
		<style>
			:root {
				/* Light theme */
				--clr-neutral-100: hsl(235, 24%, 19%); /* BG */
				--clr-neutral-75: hsl(235, 21%, 11%); /* Section BG */
				--clr-neutral-50: hsl(234, 11%, 52%); /* Checkbox border */
				--clr-neutral-25: hsl(234, 11%, 52%); /* Light text */
				--clr-neutral-10: hsl(234, 39%, 85%); /* Dark text */

				/* Images */
				--bgi-header-desktop: url("/images/bg-desktop-dark.jpg");
				--bgi-header-mobile: url("/images/bg-mobile-dark.jpg");
			}
		</style>
	{/if}
</svelte:head>

<!-- Main -->
<header>
	<h1>Todo</h1>

	<div class="check-dark-theme">
		<input
			type="checkbox"
			id="dark-theme"
			name="dark-theme"
			aria-label="Dark theme checkbox"
			bind:checked={darkTheme}
		/>
		<label for="dark-theme" aria-label="Dark theme checkbox" />
	</div>
</header>

<main>
	<section class="todo-new">
		<form
			on:submit={(e) => {
				addNewTd(e);
			}}
			autocomplete="off"
		>
			<CustomCheckbox disabled />
			<input
				type="text"
				name="todo-new"
				aria-label="Add new todo"
				placeholder="Create new todo..."
				minlength="1"
				maxlength="64"
				required
				bind:value={newTdTitle}
			/>
		</form>
	</section>

	<section class="todo-list">
		<div
			on:drop={(e) => handleDrop(e)}
			on:dragover={(e) => e.preventDefault()}
		>
			{#each $todos as todo (todo.id)}
				{#if filter === "all" || (filter === "active" && todo.active) || (filter === "completed" && !todo.active)}
					<Todo {todo} />
				{/if}
			{/each}
		</div>

		<!-- Footer -->
		<div class="todo-list-footer">
			<p class="light">{$todos.length} items left</p>

			<div class="todo-filter desktop">
				<label for="todo-filter-all" class:checked={filter === "all"}
					>All</label
				>
				<label
					for="todo-filter-active"
					class:checked={filter === "active"}>Active</label
				>
				<label
					for="todo-filter-completed"
					class:checked={filter === "completed"}>Completed</label
				>
			</div>

			<button
				class="todo-delete-completed"
				on:click={() => {
					clearDoneTds();
				}}>Clear Completed</button
			>
		</div>
	</section>

	<section class="todo-filter">
		<input
			type="radio"
			name="todo-filter"
			id="todo-filter-all"
			bind:group={filter}
			value="all"
		/>
		<label for="todo-filter-all" class:checked={filter === "all"}>All</label
		>

		<input
			type="radio"
			name="todo-filter"
			id="todo-filter-active"
			bind:group={filter}
			value="active"
		/>
		<label for="todo-filter-active" class:checked={filter === "active"}
			>Active</label
		>

		<input
			type="radio"
			name="todo-filter"
			id="todo-filter-completed"
			bind:group={filter}
			value="completed"
		/>
		<label
			for="todo-filter-completed"
			class:checked={filter === "completed"}>Completed</label
		>
	</section>

	<p class="informant">Drag and drop to reorder list</p>
</main>

<footer>
	Challenge by <a
		href="https://www.frontendmentor.io?ref=challenge"
		target="_blank">Frontend Mentor</a
	>. Coded by
	<a
		href="https://www.frontendmentor.io/profile/sutaC"
		target="_blank"
		rel="noopener noreferrer">sutaC</a
	>.
</footer>

<!-- Style -->
<style>
	/* Preset */
	@import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap");

	:global(:root) {
		/* Colors */
		/* Primary */
		--clr-primary: hsl(220, 98%, 61%);

		/* Light theme */
		--clr-neutral-100: hsl(0, 0%, 98%);
		--clr-neutral-75: hsl(236, 33%, 92%);
		--clr-neutral-50: hsl(233, 11%, 84%);
		--clr-neutral-25: hsl(236, 9%, 61%);
		--clr-neutral-10: hsl(235, 19%, 35%);

		/* Images */
		--bgi-header-desktop: url("/images/bg-desktop-light.jpg");
		--bgi-header-mobile: url("/images/bg-mobile-light.jpg");
	}

	* {
		box-sizing: border-box;
	}

	:global(html) {
		font-family: "Josefin Sans", sans-serif;
		font-size: 18px;
	}
	:global(input),
	:blobal(button) {
		font-family: "Josefin Sans", sans-serif;
	}

	:global(body) {
		padding: 0;
		margin: 0;
		min-height: 100vh;

		background-color: var(--clr-neutral-75);
		background-image: var(--bgi-header-mobile);
		background-repeat: no-repeat;
		background-position: top;
		background-size: contain;

		color: var(--clr-neutral-10);
	}

	header,
	main,
	footer {
		width: clamp(30%, 25rem, 90%);
		margin: 0 auto;
	}
	/* Main */

	section {
		background-color: var(--clr-neutral-100);
		margin: 1em 0;
		padding: 1em;

		border-radius: 5px;
		box-shadow: 0 0.25rem 0.5rem hsla(0, 0%, 0%, 0.15);
	}

	.todo-new > form {
		display: flex;
		gap: 0.5em;
		align-items: center;
	}
	.todo-new input {
		width: 100%;
		border: none;
		padding: 0;

		font-size: 0.7rem;

		color: var(--clr-neutral-10);
		background-color: transparent;
		caret-color: var(--clr-primary);
		outline: none;
	}

	.todo-list {
		padding: 0.5em 0;
	}
	.todo-list-footer {
		display: flex;
		align-items: end;
		justify-content: space-between;

		margin: 1em;

		font-size: 0.7rem;
		color: var(--clr-neutral-25);
	}
	.todo-list-footer > p {
		margin: 0;
	}
	.todo-list-footer > button {
		background-color: transparent;
		border: none;

		font-size: 0.7rem;
		color: var(--clr-neutral-25);

		cursor: pointer;
	}
	.todo-list-footer > button:hover {
		color: var(--clr-neutral-10);
	}

	.todo-filter {
		display: flex;
		align-items: baseline;
		justify-content: space-evenly;
		gap: 1em;

		color: var(--clr-neutral-25);
		font-size: 0.85rem;
		font-weight: bold;
	}
	.todo-filter input {
		display: none;
	}
	.todo-filter label {
		cursor: pointer;
	}
	.todo-filter input:checked + label {
		color: var(--clr-primary);
	}
	.todo-filter
		:not(input:checked, input:disabled)
		+ label:not(.checked):hover {
		color: var(--clr-neutral-10);
	}

	.todo-list-footer > .todo-filter {
		display: none;

		font-size: 0.7rem;
		font-weight: normal;
	}
	.checked {
		color: var(--clr-primary);
	}

	.informant {
		margin-top: 3em;
		text-align: center;
		font-size: 0.75rem;
		color: var(--clr-neutral-25);
	}
	/* Header & Footer */

	header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;

		padding: 1rem 0;
	}
	h1 {
		text-transform: uppercase;
		font-size: 1.5rem;
		letter-spacing: 0.5rem;
		color: white;
	}

	.check-dark-theme > input {
		display: none;
	}
	.check-dark-theme > label {
		display: block;
		width: 1rem;
		height: 1rem;

		background-image: url("/images/icon-moon.svg");
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;

		cursor: pointer;
	}
	.check-dark-theme > input:checked + label {
		background-image: url("/images/icon-sun.svg");
	}

	footer {
		position: fixed;
		left: 0;
		bottom: 0.125rem;
		width: 100vw;
		text-align: center;
		font-size: 0.5rem;
	}

	/* Desktop view */

	@media (width >= 600px) {
		:global(body) {
			background-image: var(--bgi-header-desktop);
		}

		.todo-filter {
			display: none;
		}
		.todo-list-footer > .todo-filter {
			display: flex;
		}
	}
</style>
