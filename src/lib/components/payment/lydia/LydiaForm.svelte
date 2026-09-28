<script lang="ts">
    import type { PaymentFormProps } from '$lib/utils/payment';
    import { bookingRepository, meRepository, type PaymentMethod } from '$lib/api';
    import { createMutation } from '@tanstack/svelte-query';
    import { m } from '$lib/paraglide/messages';
    import { formatMoney } from '$lib/utils/i18n';
    import { page } from '$app/state';

    const rememberPaymentPhoneMutation = createMutation(() => ({
        mutationFn: ({ phone }: { phone: string }) => meRepository.rememberPaymentPhone(phone),
        onSuccess: (data) => {
            console.log('Payment phone remembered:', data);
        },
        onError: (error) => {
            console.error('Remember payment phone failed:', error);
            //TODO afficher une erreur à l'utilisateur
        }
    }));

    const payBookingMutation = createMutation(() => ({
        mutationFn: ({
            code,
            paymentMethod,
            phone,
            callbackUrl,
            amount
        }: {
            code: string;
            paymentMethod: PaymentMethod;
            phone: string;
            callbackUrl: string;
            amount: number;
        }) => bookingRepository.payBooking(code, paymentMethod, phone, callbackUrl, amount),
        onSuccess: (data) => {
            console.log('Booking paid:', data);
            onPaid();
        },
        onError: (error) => {
            console.error('Pay booking failed:', error);
            //TODO afficher une erreur à l'utilisateur
        }
    }));

    let { code, amount, onBack, onPaid }: PaymentFormProps = $props();

    let phone = $state(page.data.user?.paymentPhone ?? '');
    let inProgress = $state(false);

    async function handleSubmit(event: Event) {
        if (inProgress) return;
        inProgress = true;
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const phoneInput = form.querySelector('input[type="tel"]') as HTMLInputElement;
        const rememberCheckbox = form.querySelector('input[type="checkbox"]') as HTMLInputElement;
        if (rememberCheckbox.checked) {
            rememberPaymentPhoneMutation.mutate({ phone: phoneInput.value });
        }
        payBookingMutation.mutate({
            code,
            paymentMethod: 'Lydia',
            phone: phoneInput.value,
            callbackUrl: '',
            amount
        });
        inProgress = false;
    }
</script>

<form onsubmit={handleSubmit}>
    <input type="tel" placeholder="Numéro de téléphone" bind:value={phone} required />
    <input type="checkbox" />
    <p>{m['remember.phone']()}</p>
    <button type="button" onclick={onBack}>{m['back']()}</button>
    <button type="submit" disabled={inProgress}>
        {m['pay']()}
        {formatMoney(amount)}
    </button>
</form>
