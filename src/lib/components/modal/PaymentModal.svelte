<script lang="ts">
	type Step = 'amount' | 'method' | 'provider' | 'follow-up';

	let historyStack = $state<Step[]>(['amount']);

	//Faut skip amount si le ticket est à prix fixe
	//Faut skip method si le ticket si un seul provider de paiement est disponible
</script>
