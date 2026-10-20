<script lang="ts">
    import type { UserFamily } from '#lib/api/index.ts';

    interface Props {
        userFamily: UserFamily;
    }

    let { userFamily }: Props = $props();
</script>

{userFamily}
