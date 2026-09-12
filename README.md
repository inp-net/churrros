# Churros V3

Client pour l'application Churros.

L'objectif de ce projet est de créer un nouveau client léger et rapide pour l'application Churros, qui soit facile à maintenir et à faire évoluer.
Pour ce faire, nous utilisons :

- Svelte, sveltekit et typescript pour le front-end/backend.
- Tanstack query pour l'interaction avec l'API Churros.
- Paraglide pour les traductions.

Nous avons essayer d'abstraire au maximum certaines partie du code pour permettre d'ajouter facilement des remplacements.
Notamment pour l'api, Churros V2 utilise une API graphql.

Pour intéragir avec l'API graphql nous utilisons gql.tada pour le typage avec introspection de l'API et un client basique fait avec un simple fetch.

## Contribution

![Statut traduction](https://weblate.inpt.fr/widget/churros/churros/multi-auto.svg)

### Traduction

Pour contribuer à la traduction de l'application vous pouvez vous rendre sur le site [Weblate](https://weblate.inpt.fr/projects/churros/churros/) et vous connecter avec votre compte INP-net. Vous pourrez ensuite proposer des traductions pour les messages existants, et ajouter de nouvelles langues si nécessaire.

### Développement

Pour contribuer à ce projet, veuillez lire le fichier [CONTRIBUTING.md](CONTRIBUTING.md).
