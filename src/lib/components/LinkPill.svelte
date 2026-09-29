<script lang="ts">
    import type { Link } from '$lib/api';

    interface Props {
        link: Link;
    }

    let { link }: Props = $props();
</script>

<a href={link.url}>{link.text}</a>
