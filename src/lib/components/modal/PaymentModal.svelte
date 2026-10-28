<script lang="ts">
    import { browser } from '$app/env';

    import type { PaymentMethod } from '#lib/api/index.ts';
    import { m } from '#lib/paraglide/messages.js';
    import { formatMoney } from '#lib/utils/i18n.ts';
    import { PAYMENT_PROVIDERS } from '#lib/utils/payment.ts';

    import PaymentMethodDisplay from '../PaymentMethodDisplay.svelte';

    type Step =
        | 'payment-options'
        | 'provider-form'
        | 'provider-waiting'
        | 'follow-up'
        | 'links'
        | 'end';

    interface Props {
        /**
         * The id associated with the payment (currently the reservation code)
         */
        code: string;
        isOpen: boolean;
        /**
         * Minimum price of the ticket.
         */
        minimumPrice: number;
        /**
         * Maximum price of the ticket (optional). If not provided it will default to the minimum price.
         */
        maximumPrice?: number;
        /**
         * The amount the user wants to pay, defaults to minimumPrice (Used when maximumPrice is provided which means the user can choose how much to pay)
         */
        wantsToPay: number;
        /**
         * The payment methods allowed for the payment.
         */
        allowedPaymentMethods: PaymentMethod[];
        /**
         * The payment method selected by the user (optional).
         */
        selectedPaymentMethod?: PaymentMethod;
        /**
         * Callback to be called when the user selects a payment method and wants to pay. It should return true if the payment was successful, false otherwise.
         * Right now the current API doesn't support this, so it won't be used.
         */
        //OnSelectPaymentInfo: (paymentMethod: PaymentMethod, wantsToPay: number) => Promise<boolean>;
        /**
         * The links to be displayed at the end of the payment process (optional). Each link has a name and a url.
         */
        links: { name: string; url: string }[];
    }

    let {
            code,
            isOpen = $bindable(false),
            minimumPrice,
            maximumPrice,
            wantsToPay,
            allowedPaymentMethods,
            selectedPaymentMethod,
            links,
        }: Props = $props(),
        dialog: HTMLDialogElement | undefined,
        historyStack = $state<Step[]>(loadStoredSteps()),
        step = $derived(historyStack.at(-1)!);

    $effect(() => {
        if (isOpen) {
            dialog?.showModal();
        } else {
            dialog?.close();
        }
    });

    // This might be a bit too much, but basically if we reload we lose everything which is annoying
    // So I save the state stack in sessionStorage to be able to reload.
    // This is useful for the waiting (e.g., Lydia).
    function savePersistedStep(stack: Step[]) {
        if (!browser) {
            return;
        }
        try {
            if (stack.length > 1) {
                sessionStorage.setItem(`PaymentModal${code}`, JSON.stringify(stack));
            } else {
                sessionStorage.removeItem(`PaymentModal${code}`);
            }
        } catch {
            return;
        }
    }

    function loadStoredSteps(): Step[] {
        if (!browser) {
            return ['payment-options'];
        }
        try {
            const raw = sessionStorage.getItem(`PaymentModal${code}`);
            if (!raw) {
                return ['payment-options'];
            }
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed as Step[];
            }
        } catch {
            return ['payment-options'];
        }
        return ['payment-options'];
    }

    function clearStoredSteps(): void {
        if (!browser) {
            return;
        }
        try {
            sessionStorage.removeItem(`PaymentModal${code}`);
        } catch {
            return; // Ignore errors, if we can't clear it will be cleared when the session ends
        }
    }

    function getNextStep(current: Step, selectedPaymentMethod: PaymentMethod): Step {
        const provider = PAYMENT_PROVIDERS[selectedPaymentMethod];

        switch (current) {
            case 'payment-options': {
                if (provider.automated) {
                    if (!provider.FormComponent) {
                        throw new Error(
                            'Provider incorrectly configured: automated provider has no FormComponent',
                        );
                    }
                    return 'provider-form';
                }
                if (provider.FollowUpComponent) {
                    return 'follow-up';
                }
                if (links.length > 0) {
                    return 'links';
                }
                return 'end';
            }

            case 'provider-form': {
                if (provider.WaitingComponent) {
                    return 'provider-waiting';
                }
                if (provider.FollowUpComponent) {
                    return 'follow-up';
                }
                if (links.length > 0) {
                    return 'links';
                }
                return 'end';
            }

            case 'provider-waiting': {
                if (provider.FollowUpComponent) {
                    return 'follow-up';
                }
                if (links.length > 0) {
                    return 'links';
                }
                return 'end';
            }

            case 'follow-up': {
                if (links.length > 0) {
                    return 'links';
                }
                return 'end';
            }

            case 'links': {
                return 'end';
            }
            default: {
                throw new Error(`Unknown step: ${current}`);
            }
        }
    }

    function back() {
        if (historyStack.length > 1) {
            historyStack = historyStack.slice(0, -1);
        }
    }

    function advance(current: Step, selectedPaymentMethod: PaymentMethod) {
        const next = getNextStep(current, selectedPaymentMethod);
        if (next === 'end') {
            finish();
        } else {
            historyStack = [...historyStack, next];
            savePersistedStep(historyStack);
        }
    }

    function finish() {
        isOpen = false;
        historyStack = ['payment-options'];
        clearStoredSteps();
    }
</script>

<dialog bind:this={dialog} onclose={() => (isOpen = false)}>
    {#if step == 'payment-options'}
        <p>{formatMoney(wantsToPay)}</p>
        {#if maximumPrice}
            <input
                type="number"
                min={minimumPrice}
                max={maximumPrice}
                bind:value={wantsToPay}
                required
            />
        {/if}
        <ul>
            {#each allowedPaymentMethods as method}
                <li>
                    {#if method == selectedPaymentMethod}
                        X
                    {/if}
                    <button onclick={() => (selectedPaymentMethod = method)}>
                        <PaymentMethodDisplay paymentMethod={method} />
                    </button>
                </li>
            {/each}
        </ul>
        <button onclick={() => (isOpen = false)}>{m['cancel']()}</button>
        <button onclick={() => advance('payment-options', selectedPaymentMethod!)}
            >{m['next']()}</button
        >
    {:else if step == 'provider-form'}
        {@const provider = PAYMENT_PROVIDERS[selectedPaymentMethod!]}
        {@const FormComponent = provider.FormComponent!}
        <FormComponent
            {code}
            amount={wantsToPay}
            onBack={back}
            onPaid={() => advance('provider-form', selectedPaymentMethod!)}
        />
    {:else if step == 'provider-waiting'}
        {@const provider = PAYMENT_PROVIDERS[selectedPaymentMethod!]}
        {@const WaitingComponent = provider.WaitingComponent!}
        <!--TODO : Meilleur reload si possible ? -->
        <WaitingComponent onBack={back} onRecheck={() => globalThis.location.reload()} />
    {:else if step == 'follow-up'}
        {@const provider = PAYMENT_PROVIDERS[selectedPaymentMethod!]}
        {@const FollowUpComponent = provider.FollowUpComponent!}
        <FollowUpComponent
            onBack={back}
            onDone={() => advance('follow-up', selectedPaymentMethod!)}
        />
    {:else if step == 'links'}
        {#each links as link}
            <a href={link.url}>{link.name}</a>
        {/each}
    {/if}
</dialog>
