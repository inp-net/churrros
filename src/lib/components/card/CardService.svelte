<script lang="ts">
    import type { CardService } from '#lib/api/index.ts';

    interface Props {
        service: CardService;
    }

    let { service }: Props = $props();
</script>

<a href={service.url}>
    <p>{service.name}</p>
    {service.logo}
    <!--Problème avec le logo :  Avant c'était soit url d'image ou composant je crois, on fait quoi ? -->
    <p>{service.description}</p>
    {#if service.pinned}
        <p>EPINGLE</p>
        <!-- Ce sera une icone epingle donc pas besoin de texte -->
    {/if}
</a>
