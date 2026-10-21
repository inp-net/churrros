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
Pour ce faire, il faut installer churros v2 et le lancer. Pour plus d'informations sur l'installation de churros v2, vous pouvez consulter le fichier [CONTRIBUTING.md](https://git.inpt.fr/churros/churros/-/blob/main/CONTRIBUTING.md).

Une fois le pull effectué, voici les étapes à réaliser.

Il faut setup les variables d'environnement dans Churros V2. Voici les étapes à réaliser pour régler le problème `Cannot GET /auth/oauth2`.
Exécuter la commande suivante dans la racine de Churros V2 : `yarn dev:env`. Ce script écoute tout changement du `.env` racine et met à jour le fichier `.env` de tous les packages en conséquent.

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

Il faut lancer uniquement le backend, voici les commandes à exécuter dans la
racine du projet churros v2 :

```bash
docker compose up -d
yarn @api dev
```

L'api sera alors disponible sur le port 4000 et plus précisément sur l'URL
suivante : [http://localhost:4000/graphql](http://localhost:4000/graphql).

Vous pouvez maintenant lancer le frontend churros v3 avec la commande suivante
à la racine du projet churros v3 :

```bash
pnpm dev
```

## Développement

Pour le développement, notamment sur vscode, il faut faire attention à bien
utiliser la version de typescript du workspace et non celle de l'extension
vscode.

L'utilisation de la version du workspace permet de bien faire fonctionner le
plugin [gql.tada](https://gql-tada.0no.co/get-started/installation) qui permet
d'avoir le schema GraphQL de l'api churros v2, et de la correction sur les
requêtes GraphQL.

### Ajouter des traductions

Lorsque vous ajoutez des textes sur le front de l'appli, il est nécessaire d'utiliser paraglide ce qui permettra de gérer les traductions facilement. Voici les étapes à suivre pour ajouter un texte avec paraglide :

1. Trouver une clé unique pour le texte qui représente le texte à traduire. (On a pas encore de convention pour le nommage)
2. Ajouter la clé et le texte correspondant dans le fichier messages/fr.json pour la langue française qui est la langue principale du projet.
3. (Optionnel) ajouter la clé et le texte correspondant dans les autres fichiers de langues si vous savez déjà la traduction.
4. Compiler les fichiers de traduction avec la commande `pnpm paraglide:compile` qui va générer le fichier messages.js dans le dossier src/lib/paraglide.
5. Utiliser la clé dans le code avec la fonction m. Exemple : `m['ma_cle_de_traduction']()` avec un import de la fonction m depuis le fichier messages.js : `import { m } from '#lib/paraglide/messages.js';`

La traduction du projet est externalisée avec [Weblate](https://weblate.inpt.fr/projects/churros/churros) qui permet à des contributeurs externes de traduire facilement le projet.

### Tanstack Query

Tanstack query est l'une des librairies principales utilisées dans le projet
pour gérer les requêtes vers l'API. Toutes les requêtes vers l'API doivent
passer par cette librairie pour bénéficier de la gestion du cache, des erreurs,
....

Par défaut le cache est à 15 minutes et la manière dont le cache fonctionne sur
Tanstack Query est qu'il est valide pendant la navigation sur le site, mais en
cas de refresh, ou de fermeture de l'onglet, le cache est perdu.
