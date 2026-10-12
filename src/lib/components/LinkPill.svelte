<script lang="ts">
    import type { Link } from '#lib/api/index.ts';

    interface Props {
        link: Link;
    }

    let { link }: Props = $props();
</script>

<a href={link.url}>{link.text}</a>
