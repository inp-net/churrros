export interface Platform {
    authFlow: AuthFlow;
    storage: Storage;
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
    credentials: RequestCredentials;
}

export interface Storage {
    /**
     * Get a value from storage.
     * @param key the key to retrieve
     * @returns the value or null if not found
     */
    get(key: string): Promise<string | null>;
    /**
     * Sets a value in storage.
     * @param key the key to set
     * @param value the value to set
     */
    set(key: string, value: string): Promise<void>;
    /**
     * Removes a value from storage if it exists.
     * @param key the key to remove
     */
    remove(key: string): Promise<void>;
}
