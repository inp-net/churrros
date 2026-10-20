import type { PaymentMethod } from '#lib/api/index.ts';
import { m } from '#lib/paraglide/messages.js';
import type { Component } from 'svelte';

import LydiaForm from '#lib/components/payment/lydia/LydiaForm.svelte';
import LydiaWaiting from '#lib/components/payment/lydia/LydiaWaiting.svelte';

import ManualFollowUp from '#lib/components/payment/manual/ManualFollowUp.svelte';

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
    Card: { label: m['paymentMethod.card'](), automated: false, FollowUpComponent: ManualFollowUp },
    Lydia: {
        label: 'Lydia',
        automated: true,
        FormComponent: LydiaForm,
        WaitingComponent: LydiaWaiting
    },
    Check: {
        label: m['paymentMethod.check'](),
        automated: false,
        FollowUpComponent: ManualFollowUp
    },
    Cash: { label: m['paymentMethod.cash'](), automated: false, FollowUpComponent: ManualFollowUp },
    External: {
        label: m['paymentMethod.external'](),
        automated: false,
        FollowUpComponent: ManualFollowUp
    },
    Other: {
        label: m['paymentMethod.other'](),
        automated: false,
        FollowUpComponent: ManualFollowUp
    },
    PayPal: { label: 'PayPal', automated: true },
    Transfer: {
        label: m['paymentMethod.transfer'](),
        automated: false,
        FollowUpComponent: ManualFollowUp
    }
};
