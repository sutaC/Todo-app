<script lang="ts">
	export let disabled = false;
	export let checked = false;

	const id = "checkbox-" + Math.random();
</script>

<div>
	<input
		type="checkbox"
		{id}
		aria-label="Todo state"
		{disabled}
		bind:checked
		on:change
	/>
	<label for={id} />
</div>

<style>
	label {
		--_size: 1.125em;

		position: relative;

		display: block;
		width: var(--_size);
		height: var(--_size);

		background-color: var(--clr-neutral-100);
		border: 1px solid var(--clr-neutral-50);
		border-radius: 100%;

		cursor: pointer;
	}
	:not(input:checked, input:disabled) + label:hover {
		border-color: var(--clr-primary);
	}

	input {
		display: none;
	}

	input:checked + label {
		background: linear-gradient(
			to bottom right,
			hsl(192, 100%, 67%),
			hsl(280, 87%, 65%)
		);
	}
	input:checked + label::after {
		content: url("/images/icon-check.svg");
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
	}
</style>
