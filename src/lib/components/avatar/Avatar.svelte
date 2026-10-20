<script lang="ts">
    import type { Avatar } from '#lib/api/index.ts';

    interface Props {
        avatar: Avatar;
        link?: string;
        width?: number;
        height?: number;
    }

    let { avatar, link, width = 100, height = 100 }: Props = $props();
</script>

<div>
    {avatar.name}
    <a href={link} rel="noopener noreferrer">
        {avatar.uid}
    </a>
    <img src={avatar.pictureURL} alt="Groupe" {width} {height} />
</div>
