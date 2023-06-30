<script lang="ts">
	import CustomCheckbox from "$lib/components/customCheckbox.svelte";

	let checked = false;
</script>

<div class="todo" class:checked>
	<CustomCheckbox bind:checked />

	<p><slot /></p>
	<button class="todo-detete" aria-label="Delete todo" />
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

	/* Checked */

	.checked p {
		opacity: 0.25;
		text-decoration: line-through;
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
