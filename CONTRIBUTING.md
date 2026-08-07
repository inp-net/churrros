# Travailler sur churros v3

## Mise en place de l'environnement de développement

### Prérequis

- Etre sous Linux, MacOS ou Windows (avec WSL)
- Avoir Node.js et pnpm installés (pnpm vient avec Node.js)

## Installation

1. Cloner le dépôt :
   `git clone https://git.inpt.fr/churros/churrros.git`
   ou avec ssh :
   `git clone git@git.inpt.fr:churros/churrros.git`

2. Installer les dépendances :
   `pnpm install` ou `pnpm i`

## Lancer le projet

Vu que churros v3 est la nouvelle version du frontend du projet, il est nécessaire de lancer le backend pour que le frontend fonctionne correctement.
Pour se faire il faut installer churros v2 et le lancer. Pour plus d'informations sur l'installation de churros v2, vous pouvez consulter le fichier [CONTRIBUTING.md](https://git.inpt.fr/churros/churros/-/blob/main/CONTRIBUTING.md).

Une fois le projet installé, il faut lancer uniquement le backend, il faut lancer ces commandes dans le terminal à la racine du projet churros v2 :

```bash
docker compose up -d
yarn @api dev
```

L'api sera alors disponible sur le port 4000 et plus précisément sur l'url suivante : [http://localhost:4000/graphql](http://localhost:4000/graphql).

Vous pouvez maintenant lancer le frontend churros v3 avec la commande suivante à la racine du projet churros v3 :

```bash
pnpm dev
```

## Développement

Pour le développement, notamment sur vscode, il faut faire attention à bien utiliser la version de typescript du workspace et non celle de l'extension vscode.
L'utilisation de la version du workspace permet de bien faire fonctionner le plugin [gql.tada](https://gql-tada.0no.co/get-started/installation) qui permet d'avoir le schema GraphQL de l'api churros v2, et de la correction sur les requêtes GraphQL.

### Activer l'oAuth2 en développement

Par défaut l'oauth2 n'est pas activé sur l'API churros v2 en développement, si vous essayer de vous connecter avec l'oAuth2, vous aurez une erreur "Cannot GET /auth/oauth2".

Pour activer l'oauth2, il faut modifier le fichier .env à la racine du projet churros v2 et remplir toutes les variables d'env qui contiennent "OAUTH" dans la catégorie "oauth client". Pour récuperer les valeurs, regarder celles présentes dans l'environnement de production sur l'api churros v2.

```
PUBLIC_OAUTH_ENABLED="0"
PUBLIC_OAUTH_LOGOUT_URL=""
PUBLIC_OAUTH_AUTHORIZE_URL=""
PUBLIC_OAUTH_CLIENT_ID=""
PUBLIC_OAUTH_TOKEN_URL=""
PUBLIC_OAUTH_USER_INFO_URL=""
PUBLIC_OAUTH_SCOPES="openid,profile,email"
PUBLIC_OAUTH_LOGO_URL=""
PUBLIC_OAUTH_NAME=""
OAUTH_UID_KEY="nickname"
OAUTH_CLIENT_SECRET=""
```

Une fois les changements effectués, il faut relancer l'api churros v2 pour que les changements soient pris en compte.
Utilisez bien la commande `yarn dev:env` pour repercuter les changements du .env vers tous les autres packages.
