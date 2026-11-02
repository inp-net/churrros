<script lang="ts">
    import { page } from '$app/state';
    import { createMutation } from '@tanstack/svelte-query';

    import { type PaymentMethod, bookingRepository, meRepository } from '#lib/api/index.ts';
    import { m } from '#lib/paraglide/messages.js';
    import { formatMoney } from '#lib/utils/i18n.ts';
    import type { PaymentFormProps } from '#lib/utils/payment.ts';
    import { showToast } from '#lib/utils/toast.ts';

    const rememberPaymentPhoneMutation = createMutation(() => ({
            mutationFn: ({ phone }: { phone: string }) => meRepository.rememberPaymentPhone(phone),
            onError: (error) => {
                showToast(m['payment.toast.phone.failed'](), 'danger', true);
            },
            onSuccess: (data) => {
                showToast(m['payment.toast.phone.success'](), 'success', true);
            },
        })),
        payBookingMutation = createMutation(() => ({
            mutationFn: ({
                code,
                paymentMethod,
                phone,
                callbackUrl,
                amount,
            }: {
                code: string;
                paymentMethod: PaymentMethod;
                phone: string;
                callbackUrl: string;
                amount: number;
            }) => bookingRepository.payBooking(code, paymentMethod, callbackUrl, amount, phone),
            onError: (error) => {
                showToast(m['payment.toast.payment.failed'](), 'danger', true);
            },
            onSuccess: (data) => {
                onPaid();
                showToast(m['payment.toast.payment.success'](), 'success', true);
            },
        }));

    let { code, amount, onBack, onPaid }: PaymentFormProps = $props(),
        phone = $state(page.data.user?.paymentPhone ?? ''),
        inProgress = $state(false);

    async function handleSubmit(event: Event) {
        if (inProgress) {
            return;
        }
        inProgress = true;
        event.preventDefault();
        const form = event.target as HTMLFormElement,
            phoneInput = form.querySelector('input[type="tel"]') as HTMLInputElement,
            rememberCheckbox = form.querySelector('input[type="checkbox"]') as HTMLInputElement;
        if (rememberCheckbox.checked) {
            rememberPaymentPhoneMutation.mutate({ phone: phoneInput.value });
        }
        payBookingMutation.mutate({
            amount,
            callbackUrl: '',
            code,
            paymentMethod: 'Lydia',
            phone: phoneInput.value,
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
