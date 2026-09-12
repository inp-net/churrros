//Dans un fichier à part car les enums faut les avoir en type et en valeur pour que ça marche bien

/**
 * Etat d'une réservation
 */
export enum BookingStatus {
    OPPOSED,
    VERIFIED,
    CANCELLED,
    PAID,
    WAITING,
}

/**
 * Liste des wallets supportés pour l'ajout de billets
 */
export enum WalletTarget {
    APPLE,
    GOOGLE,
}

/**
 * Méthode de paiement supporté par l'application
 * TODO : Trouver comment recup de l'API ? 
 */
export enum PaymentMethod {
    CARD,
    CHECK,
    CASH,
    LYDIA,
    PAYPAL,
    EXTERNAL,
    OTHER,
    TRANSFER
}