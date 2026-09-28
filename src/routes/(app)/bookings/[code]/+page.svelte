<script lang="ts">
    import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
    import { bookingRepository, WalletTarget } from '$lib/api';
    import { m } from '$lib/paraglide/messages';
    import { page } from '$app/state';
    import QRCode from '$lib/components/QRCode.svelte';
    import AddToWallet from '$lib/components/AddToWallet.svelte';
    import Avatar from '$lib/components/avatar/Avatar.svelte';
    import PaymentMethodDisplay from '$lib/components/PaymentMethodDisplay.svelte';
    import CardLightEvent from '$lib/components/card/CardLightEvent.svelte';
    import ConfirmationModal from '$lib/components/modal/ConfirmationModal.svelte';
    import PaymentModal from '$lib/components/modal/PaymentModal.svelte';

    const queryClient = useQueryClient();

    const query = createQuery(() => ({
        queryKey: ['booking', page.params.code],
        queryFn: () =>
            bookingRepository.getBookingByCode(
                page.params.code,
                `${page.url.origin}/bookings/[code]`
            )
    }));

    let confirmationModalIsOpen = $state(false);
    let paymentModalIsOpen = $state(false);

    const cancelMutation = createMutation(() => ({
        mutationFn: ({ code }: { code?: string }) => bookingRepository.cancelBooking(code),
        onSuccess: (data) => {
            console.log('Cancel successful:', data);
            confirmationModalIsOpen = false;
            //On invalidate car le statut à changé
            queryClient.invalidateQueries({ queryKey: ['booking', page.params.code] });
        },
        onError: (error) => {
            console.error('Cancel failed:', error);
            //TODO afficher une erreur à l'utilisateur
        }
    }));

    const googleWalletMutation = createMutation(() => ({
        mutationFn: ({ code }: { code?: string }) => bookingRepository.getGoogleWalletPass(code),
        onSuccess: (data) => {
            console.log('Google Wallet pass generated:', data);
            globalThis.location.href = data;
        },
        onError: (error) => {
            console.error('Google Wallet pass generation failed:', error);
            //TODO afficher une erreur à l'utilisateur
        }
    }));

    const appleWalletMutation = createMutation(() => ({
        mutationFn: ({ code }: { code?: string }) => bookingRepository.getAppleWalletPass(code),
        onSuccess: (data) => {
            console.log('Apple Wallet pass generated:', data);
            globalThis.location.href = data;
        },
        onError: (error) => {
            console.error('Apple Wallet pass generation failed:', error);
            //TODO afficher une erreur à l'utilisateur
        }
    }));

    $effect(() => {
        if (query.isSuccess) {
            //Si on attends le paiement de l'utilisateur on ouvre la modal de paiement direct
            paymentModalIsOpen = query.data.awaitingPayment; //C'est un peu chiant mais à voir
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
            <QRCode qrCode={query.data.qrCode} />
            <p>{query.data.code}</p>
        {/if}
    </div>

    <div>
        {#if !query.data.cancelled}
            <button onclick={() => googleWalletMutation.mutateAsync({ code: page.params.code })}>
                <AddToWallet walletTarget={WalletTarget.GOOGLE} />
            </button>
            <button onclick={() => appleWalletMutation.mutateAsync({ code: page.params.code })}>
                <AddToWallet walletTarget={WalletTarget.APPLE} />
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
