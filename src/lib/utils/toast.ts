import { toast } from 'svelte-sonner';

import SimpleToast from '#lib/components/SimpleToast.svelte';

export function showToast(
    message: string,
    variant: 'success' | 'default' | 'danger' | 'warning',
    closeable: boolean,
) {
    toast.custom(SimpleToast, {
        componentProps: {
            closeable,
            message,
            variant,
        },
    });
}
