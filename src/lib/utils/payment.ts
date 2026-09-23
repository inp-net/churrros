import type { PaymentMethod } from "$lib/api";
import { m } from "$lib/paraglide/messages";
import type { Component } from "svelte";

import LydiaForm from "$lib/components/payment/lydia/LydiaForm.svelte";
import LydiaWaiting from "$lib/components/payment/lydia/LydiaWaiting.svelte";

import ManualFollowUp from "$lib/components/payment/manual/ManualFollowUp.svelte";

interface PaymentProvider {
    //Le label affiché pour le provider
    label: string;
    icon?: Component;
    //Indique si le provider est géré en ligne ou non, un provider hors ligne ne nécessite pas de formulaire ou autre et doit être géré par les membres organisateurs.
    automated: boolean;
    //Composant de formulaire utilisé par certaines methodes de paiement pour enregistrer les infos de l'utilisateur
    FormComponent?: Component<PaymentFormProps>;
    //Composant affiché en attente de la réponse de provider
    WaitingComponent?: Component<PaymentWaitingProps>;
    //Composant affiché à la fin des méthodes pour afficher les informations sur le paiement
    FollowUpComponent?: Component<PaymentFollowUpProps>;
}

export interface PaymentFormProps {
    code: string;
    amount: number;
    onBack: () => void;
    //Callback appelé lorsque le paiement est effectué avec succès
    onPaid: () => void;
}

export interface PaymentWaitingProps {
    onBack: () => void;
    onRecheck: () => void;
}

export interface PaymentFollowUpProps {
    onBack: () => void;
    onDone: () => void;

}

export const PAYMENT_PROVIDERS: Record<PaymentMethod, PaymentProvider> = {
    Card: { label: m["paymentMethod.card"](), automated: false, FollowUpComponent: ManualFollowUp },
    Lydia: { label: "Lydia", automated: true, FormComponent: LydiaForm, WaitingComponent: LydiaWaiting },
    Check: { label: m["paymentMethod.check"](), automated: false, FollowUpComponent: ManualFollowUp },
    Cash: { label: m["paymentMethod.cash"](), automated: false, FollowUpComponent: ManualFollowUp },
    External: { label: m["paymentMethod.external"](), automated: false, FollowUpComponent: ManualFollowUp },
    Other: { label: m["paymentMethod.other"](), automated: false, FollowUpComponent: ManualFollowUp },
    PayPal: { label: "PayPal", automated: true },
    Transfer: { label: m["paymentMethod.transfer"](), automated: false, FollowUpComponent: ManualFollowUp },
};