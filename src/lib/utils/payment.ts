import type { Component } from 'svelte';

import type { PaymentMethod } from '#lib/api/index.ts';
import LydiaForm from '#lib/components/payment/lydia/LydiaForm.svelte';
import LydiaWaiting from '#lib/components/payment/lydia/LydiaWaiting.svelte';
import ManualFollowUp from '#lib/components/payment/manual/ManualFollowUp.svelte';
import { m } from '#lib/paraglide/messages.js';

interface PaymentProvider {
    /**
     * The label of the payment provider, used for display purposes
     */
    label: string;
    icon?: Component;
    /**
     * Indicates whether the provider is managed online or not, an offline provider does not require a form or anything else and must be managed by the organizing members.
     */
    automated: boolean;
    /**
     * The form component used by some payment methods to collect user information.
     */
    FormComponent?: Component<PaymentFormProps>;
    /**
     * The component displayed while waiting for the provider's response.
     */
    WaitingComponent?: Component<PaymentWaitingProps>;
    /**
     * The component displayed after the payment is completed, used for follow-up actions.
     */
    FollowUpComponent?: Component<PaymentFollowUpProps>;
}

export interface PaymentFormProps {
    /**
     * The code associated with the payment (Right now only the booking code is used)
     */
    code: string;
    /**
     * The amount to be paid, used for display purposes
     */
    amount: number;
    /**
     * Callback function to be called when the user wants to go back to the previous step.
     */
    onBack: () => void;
    /**
     * Callback function to be called when the payment is successfully completed.
     */
    onPaid: () => void;
}

export interface PaymentWaitingProps {
    /**
     * Callback function to be called when the user wants to go back a step
     */
    onBack: () => void;
    /**
     * Callback function to be called when the user wants to recheck the payment status
     */
    onRecheck: () => void;
}

export interface PaymentFollowUpProps {
    /**
     * Callback function to be called when the user wants to go back a step
     */
    onBack: () => void;
    /**
     * Callback function that indicates that the user has completed the follow-up step and wants to close the payment modal.
     */
    onDone: () => void;
}

export const PAYMENT_PROVIDERS: Record<PaymentMethod, PaymentProvider> = {
    Card: { FollowUpComponent: ManualFollowUp, automated: false, label: m['paymentMethod.card']() },
    Cash: { FollowUpComponent: ManualFollowUp, automated: false, label: m['paymentMethod.cash']() },
    Check: {
        FollowUpComponent: ManualFollowUp,
        automated: false,
        label: m['paymentMethod.check'](),
    },
    External: {
        FollowUpComponent: ManualFollowUp,
        automated: false,
        label: m['paymentMethod.external'](),
    },
    Lydia: {
        FormComponent: LydiaForm,
        WaitingComponent: LydiaWaiting,
        automated: true,
        label: 'Lydia',
    },
    Other: {
        FollowUpComponent: ManualFollowUp,
        automated: false,
        label: m['paymentMethod.other'](),
    },
    PayPal: { automated: true, label: 'PayPal' },
    Transfer: {
        FollowUpComponent: ManualFollowUp,
        automated: false,
        label: m['paymentMethod.transfer'](),
    },
};
