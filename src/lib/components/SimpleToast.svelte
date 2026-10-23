<script lang="ts">
    import { Toast } from 'azucar-ui';

    interface Props {
        message: string;
        variant?: 'default' | 'success' | 'warning' | 'danger';
        closeable?: boolean;
        closeToast?: () => void;
    }

    let { message, variant = 'default', closeable = true, closeToast }: Props = $props();
</script>

<Toast {variant} {closeable} {closeToast}>
    {@render toastContent(message)}
</Toast>

{#snippet toastContent(message: string)}
    <p>{message}</p>
{/snippet}
