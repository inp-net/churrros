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

L'api sera alors disponible sur le port 4000 et plus précisément sur l'url suivante :  [http://localhost:4000/graphql](http://localhost:4000/graphql).

Vous pouvez maintenant lancer le frontend churros v3 avec la commande suivante à la racine du projet churros v3 :

```bash
pnpm dev
```