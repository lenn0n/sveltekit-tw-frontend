<script lang="ts">
	import { onMount } from "svelte";
	// Define types for props
	export let id: string;
	export let type: "text" | "password" = "text";
	export let label: string;
	export let value: string;
	export let placeholder: string = "";
	export let hideLabel: boolean = false;
	export let customClassName: string = "";
	export let onKeyPress: any;
	export let focus: boolean = false;

	// Workaround for dynamic element props (text, password, checkbox, etc...)
	let inputElement: HTMLInputElement;
	onMount(() => {
		inputElement.type = type;

		if (focus) {
			inputElement.focus();
		}
	});

	// Event handler for keyup
	const handleKeyUp = (e: KeyboardEvent) => {
		if (e.key === "Enter" && onKeyPress) {
			onKeyPress();
		}
	};
</script>

{#if !hideLabel}
	<label for={id} class="form-label">{label}</label>
{/if}

<div>
	<input
		{id}
		bind:this={inputElement}
		class={`form-input ${customClassName}`}
		bind:value
		on:keyup={handleKeyUp}
		{placeholder}
	/>
</div>
