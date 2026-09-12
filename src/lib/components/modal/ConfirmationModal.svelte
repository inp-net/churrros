<script lang="ts">
	import { m } from '$lib/paraglide/messages';

	//Sera surement remplacé par un composant modal bien fait dans azucar
	//Mais en gros en terme de design on est sur du Confirm Cancel

	interface Props {
		description: string;
		isOpen: boolean;
		onCancel: () => void;
		onConfirm: () => void;
	}

	let dialog: HTMLDialogElement | undefined;
	$effect(() => {
		if (isOpen) {
			dialog?.showModal();
		} else dialog?.close();
	});
	let { description, isOpen = $bindable(false), onCancel, onConfirm }: Props = $props();
</script>

<dialog bind:this={dialog} onclose={() => (isOpen = false)}>
	<h1>{m['confirm.title']()}</h1>
	{description}
	<div>
		<button onclick={onCancel}>{m['cancel']()}</button>
		<!--Rouge = comme si j'avais mis du css-->
		<button onclick={onConfirm}>(ROUGE){m['confirm.yes']()}</button>
	</div>
</dialog>
