<script lang="ts">
	import Todo from "$lib/components/todo.svelte";
</script>

<header>
	<h1>Todo</h1>

	<div class="check-dark-theme">
		<input
			type="checkbox"
			id="dark-theme"
			name="dark-theme"
			class="check-dark-theme"
			aria-label="Dark theme checkbox"
		/>
		<label for="dark-theme" aria-label="Dark theme checkbox" />
	</div>
</header>

<main>
	<section class="todo-new">
		<form>
			<input type="text" name="todo-new" aria-label="Add new todo" />
		</form>
	</section>

	<section class="todo-list">
		<Todo
			>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis,
			ex.</Todo
		>

		<Todo
			>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis,
			ex.</Todo
		>

		<Todo
			>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis,
			ex.</Todo
		>

		<!-- Footer -->
		<div class="todo-list-footer">
			<p class="light"><!-- Add dynamic number -->3 items left</p>
			<button class="todo-delete-completed">Clear Completed</button>
		</div>
	</section>

	<section class="todo-filter">
		<input type="radio" name="todo-filter" id="todo-filter-all" />
		<label for="todo-filter-all">All</label>

		<input type="radio" name="todo-filter" id="todo-filter-active" />
		<label for="todo-filter-active">Active</label>

		<input type="radio" name="todo-filter" id="todo-filter-completed" />
		<label for="todo-filter-completed">Completed</label>
	</section>

	<p class="light">Drag and drop to reorder list</p>
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

	:global(body) {
		padding: 5%;
		margin: 0;
		min-height: 100vh;

		background-color: color-mix(
			in lab,
			var(--clr-neutral-75) 70%,
			transparent
		);
		background-image: var(--bgi-header-mobile);
		background-repeat: no-repeat;
		background-position: top;
		background-size: contain;

		color: var(--clr-neutral-10);
	}

	header,
	main,
	footer {
		width: clamp(40%, 30rem, 90%);
		margin: 0 auto;
	}
	/* Main */

	section {
		background-color: var(--clr-neutral-100);
		margin: 1em 0;
		padding: 0.5em 0;

		border-radius: 5px;
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
		color: var(--clr-neutral-100);
	}
	.check-dark-theme {
		--_theme-state: url("/images/icon-moon.svg");
	}
	.check-dark-theme > input {
		display: none;
	}
	.check-dark-theme > label {
		display: block;
		background: var(--_theme-state) no-repeat center;
		background-size: contain;
		width: 1rem;
		height: 1rem;
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
	}
</style>
