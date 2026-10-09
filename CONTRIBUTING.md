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

### Tanstack Query

Tanstack query est l'une des librairies principales utilisées dans le projet pour gérer les requêtes vers l'API. Toutes les requêtes vers l'API doivent passer par cette librairie pour bénéficier de la gestion du cache, des erreurs, ....

Par défaut le cache est à 15 minutes et la manière dont le cache fonctionne sur Tanstack Query est qu'il est valide pendant la navigation sur le site, mais en cas de refresh, ou de fermeture de l'onglet, le cache est perdu.

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

### Ajouter des traductions

Lorsque vous ajoutez des textes sur le front de l'appli, il est nécessaire d'utiliser paraglide ce qui permettra de gérer les traductions facilement. Voici les étapes à suivre pour ajouter un texte avec paraglide :

1. Trouver une clé unique pour le texte qui représente le texte à traduire. (On a pas encore de convention pour le nommage)
2. Ajouter la clé et le texte correspondant dans le fichier messages/fr.json pour la langue française qui est la langue principale du projet.
3. (Optionnel) ajouter la clé et le texte correspondant dans les autres fichiers de langues si vous savez déjà la traduction.
4. Compiler les fichiers de traduction avec la commande `pnpm paraglide:compile` qui va générer le fichier messages.js dans le dossier src/lib/paraglide.
5. Utiliser la clé dans le code avec la fonction m. Exemple : `m['ma_cle_de_traduction']()` avec un import de la fonction m depuis le fichier messages.js : `import { m } from '#lib/paraglide/messages.js';`

La traduction du projet est externalisée avec [Weblate](https://weblate.inpt.fr/projects/churros/churros) qui permet à des contributeurs externes de traduire facilement le projet.
