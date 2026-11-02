<script lang="ts">
    import { page } from '$app/state';
    import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';

    import { bookingRepository } from '#lib/api/index.ts';
    import AddToWallet from '#lib/components/AddToWallet.svelte';
    import Avatar from '#lib/components/avatar/Avatar.svelte';
    import CardLightEvent from '#lib/components/card/CardLightEvent.svelte';
    import ConfirmationModal from '#lib/components/modal/ConfirmationModal.svelte';
    import PaymentModal from '#lib/components/modal/PaymentModal.svelte';
    import PaymentMethodDisplay from '#lib/components/PaymentMethodDisplay.svelte';
    import QRCode from '#lib/components/QRCode.svelte';
    import { m } from '#lib/paraglide/messages.js';
    import { showToast } from '#lib/utils/toast.ts';

    const queryClient = useQueryClient(),
        query = createQuery(() => ({
            queryFn: () => bookingRepository.getBookingByCode(page.params.code),
            queryKey: ['booking', page.params.code],
        }));

    let confirmationModalIsOpen = $state(false),
        paymentModalIsOpen = $state(false);

    const cancelMutation = createMutation(() => ({
            mutationFn: ({ code }: { code?: string }) => bookingRepository.cancelBooking(code),
            onError: (error) => {
                console.error('Booking cancellation failed:', error);
                showToast(m['booking.toast.cancel.failed'](), 'danger', true);
            },
            onSuccess: (data) => {
                showToast(m['booking.toast.cancel.success'](), 'success', true);
                confirmationModalIsOpen = false;
                // The state of the booking has changed, so we need to invalidate the query to fetch the updated data.
                queryClient.invalidateQueries({ queryKey: ['booking', page.params.code] });
            },
        })),
        googleWalletMutation = createMutation(() => ({
            mutationFn: ({ code }: { code?: string }) =>
                bookingRepository.getGoogleWalletPass(code),
            onError: (error) => {
                showToast(m['booking.toast.wallet.google.failed'](), 'danger', true);
            },
            onSuccess: (data) => {
                globalThis.location.href = data;
            },
        })),
        appleWalletMutation = createMutation(() => ({
            mutationFn: ({ code }: { code?: string }) => bookingRepository.getAppleWalletPass(code),
            onError: (error) => {
                showToast(m['booking.toast.wallet.apple.failed'](), 'danger', true);
            },
            onSuccess: (data) => {
                globalThis.location.href = data;
            },
        }));

    $effect(() => {
        if (query.isSuccess) {
            // If we are wainting for payment, we open the payment modal. This is a bit annoying but we'll see.
            paymentModalIsOpen = query.data.awaitingPayment;
        }
    });
</script>

<h1>{m.booking()}</h1>

{#if query.isPending}
    <p>{m.loading()}</p>
{:else if query.isError}
    <!--Si le booking n'existe pas on est dans une erreur-->
    <p>Error: {query.error.message}</p>
{:else if query.isSuccess}
    <!-- <btn onclick={() => goto(`/bookings/${page.params.code}.pdf`)}>PDF</btn> -->
    <!-- TODO : Faire la generation de PDF -->

    {#each query.data.linkURLs as linkURL, i}
        <a href={linkURL}>{query.data.linkNames[i]}</a>
    {/each}

    <div class="qrcode">
        {#if query.data.cancelled}
            <p>{m['booking.cancelled']()}</p>
        {:else}
            <QRCode text={`${page.url.origin}/bookings/[code]`} />
            <p>{query.data.code}</p>
        {/if}
    </div>

    <div>
        {#if !query.data.cancelled}
            <button onclick={() => googleWalletMutation.mutateAsync({ code: page.params.code })}>
                <AddToWallet walletTarget={'Google'} />
            </button>
            <button onclick={() => appleWalletMutation.mutateAsync({ code: page.params.code })}>
                <AddToWallet walletTarget={'Apple'} />
            </button>
        {/if}
    </div>

    {#if query.data.beneficiaryUser}
        <p>{m['booking.beneficiary']()}: <Avatar avatar={query.data.beneficiaryUser} /></p>
    {:else if query.data.externalBeneficiary}
        <p>{m['booking.beneficiary']()}: {query.data.externalBeneficiary}</p>
    {:else if query.data.author}
        <p>{m['booking.beneficiary']()}: <Avatar avatar={query.data.author} /></p>
    {/if}

    {#if (query.data.beneficiaryUser || query.data.externalBeneficiary) && query.data.author}
        <p>{m['booking.author']()} : <Avatar avatar={query.data.author} /></p>
    {/if}

    <p>{m['booking.price']()} : {query.data.ticket.minimumPrice}</p>

    {#if true}
        <!--Mettre que si c'est gratuit on affiche pas-->
        <p>
            {m['booking.paymentMethod']()} :
            <PaymentMethodDisplay paymentMethod={query.data.paymentMethod} />
        </p>
        {#if !query.data.paid}
            <!-- TODO : Bouton pr changer la payment method avec la modal de paiement-->
        {/if}
    {/if}

    <p>{query.data.ticket.name}</p>
    <CardLightEvent event={query.data.ticket.event} />

    {#if !query.data.cancelled}
        <button onclick={() => (confirmationModalIsOpen = true)}>
            {query.data.paid ? m['booking.cancel']() : m['booking.free']()}
        </button>
    {/if}

    <PaymentModal
        code={page.params.code!}
        isOpen={paymentModalIsOpen}
        allowedPaymentMethods={query.data.ticket.allowedPaymentMethods}
        selectedPaymentMethod={query.data.paymentMethod ?? undefined}
        minimumPrice={query.data.ticket.actualMinimumPrice}
        maximumPrice={query.data.ticket.maximumPrice}
        wantsToPay={query.data.wantsToPay ?? query.data.ticket.actualMinimumPrice}
        links={query.data.linkURLs.map((url, i) => ({ url, name: query.data.linkNames[i] }))}
    />
{/if}

<ConfirmationModal
    isOpen={confirmationModalIsOpen}
    description={m['booking.cancel.description']()}
    onCancel={() => (confirmationModalIsOpen = false)}
    onConfirm={() => cancelMutation.mutateAsync({ code: page.params.code })}
/>
