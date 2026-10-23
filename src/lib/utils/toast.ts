import SimpleToast from '#lib/components/SimpleToast.svelte';
import { toast } from 'svelte-sonner';

export function showToast(
    message: string,
    variant: 'success' | 'default' | 'danger' | 'warning',
    closeable: boolean
) {
    toast.custom(SimpleToast, {
        componentProps: {
            message: message,
            variant: variant,
            closeable: closeable
        }
    });
}
