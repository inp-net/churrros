<script lang="ts">
    import type { TicketDetail } from '#lib/api/index.ts';

    interface Props {
        ticket: TicketDetail;
        onBook: (ticketId: string, churrosBeneficiary?: string, beneficiary?: string) => void;
        open: boolean;
    }

    let { ticket, onBook, open = $bindable(false) }: Props = $props();

    type Step = 'start' | 'beneficiary-external' | 'beneficiary-internal' | 'confirm';

    let historyStack = $state<Step[]>(['start']);
    let step = $derived(historyStack.at(-1)!);

    let churrosBeneficiary = $state<string | undefined>(undefined);
    let beneficiary = $state<string | undefined>(undefined);

    let booking = $state(false);

    let dialog: HTMLDialogElement | undefined;
    $effect(() => {
        if (open) {
            historyStack = ['start'];
            dialog?.showModal();
        } else dialog?.close();
    });

    function back() {
        if (historyStack.length > 1) historyStack = historyStack.slice(0, -1);
    }

    function advance(next: Step) {
        historyStack = [...historyStack, next];
    }

    async function createBooking() {
        booking = true;
        await onBook(ticket.id, churrosBeneficiary, beneficiary);
        booking = false;
    }

    function close() {
        open = false;
    }
</script>

<dialog bind:this={dialog} onclose={() => (open = false)}>
    <h2>
        {#if step.startsWith('beneficiary')}
            Choisir le.a bénéficiaire
        {:else}
            Réserver une place
        {/if}
    </h2>

    {#if step === 'start'}
        <button disabled={booking} onclick={() => createBooking()}>
            {booking ? 'Réservation…' : 'Pour moi'}
        </button>
        <button onclick={() => advance('beneficiary-internal')}>
            Pour quelqu'un qui a un compte Churros
        </button>
        <button onclick={() => advance('beneficiary-external')}> Pour quelqu'un d'autre </button>
        <button onclick={close}>Annuler</button>
    {:else if step === 'beneficiary-external'}
        <form
            onsubmit={(e) => {
                e.preventDefault();
                churrosBeneficiary = undefined;
                advance('confirm');
            }}
        >
            <label>
                Nom de la personne
                <input bind:value={beneficiary} required />
            </label>
            <button type="button" onclick={back}>Retour</button>
            <button type="submit">Réserver</button>
        </form>
    {:else if step === 'beneficiary-internal'}
        <form
            onsubmit={(e) => {
                e.preventDefault();
                beneficiary = undefined;
                advance('confirm');
            }}
        >
            <label>
                @ de la personne
                <input bind:value={churrosBeneficiary} required />
            </label>
            <button type="button" onclick={back}>Retour</button>
            <button type="submit">Réserver</button>
        </form>
    {:else if step === 'confirm'}
        <form
            onsubmit={(e) => {
                e.preventDefault();
                createBooking();
            }}
        >
            {#if churrosBeneficiary}
                <!--TODO Fetch l'user repository pr chopper les infos -->
                <p>Réservation d'une place pour @{churrosBeneficiary}</p>
            {:else if beneficiary}
                <p>Réservation d'une place pour {beneficiary}</p>
            {/if}
            <button type="button" onclick={back}>Retour</button>
            <button type="submit" disabled={booking}>
                {booking ? 'Réservation…' : 'Confirmer'}
            </button>
        </form>
    {/if}
</dialog>
