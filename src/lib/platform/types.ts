export interface Platform {
    authFlow: AuthFlow;
}

export interface AuthFlow {
    /**
     * Absolute URL the provider should redirect to after login.
     */
    callbackUrl(path: string): URL;
    /**
     * Begin the flow:
     * - full-page redirect on web
     * - open browser on native
     */
    start(loginUrl: URL): Promise<void>;
    /**
     * Called when the provider sends the user back.
     * Returns an unsubscribe function.
     */
    onCallback(handler: (url: URL) => void): () => void;
}
