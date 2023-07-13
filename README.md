# test_technique
Test technique poour l'entreprise Les Bons Artisans

## Configuration du server

- Faire un "pnpm install" dans le dossier serveur de l'application.

- Une fois l'installation des dépendances terminée, créer un fichier ".env" et y ajouter les variables MONGO_URI et jwtSecret.

- Pour la variable MONGO_URI, il faut créer un nouveau Cluster, récuperer le lien de connexion dans le bouton "Connect" du Cluster, et choisir "Drivers" pour copier la "connection string" dans la variable. Une fois la variable copiée dans le .env, il faut modifier le connection string pour l'adapter à l'utilisateur du cluster.
  
- Pour la variable jwtSecret, vous pouvez créer le secret que vous voulez.

- Une fois le tout terminé, faire un "nodemon index" pour démarrer le serveur.

## Routes disponibles

- Format : "http:// <baseURL> : <port> / <route>" 

- /auth/login
- /auth/register
- /products/
- /products/:id
- /products/
- /products/:id

## Methodes

- GET : pour afficher une/les information(s).
- PATCH : pour mettre à jours une/les information(s).
- POST : pour ajouter une/les information(s).
- DELETE : pour supprimer une/les information(s).

## Configuration du client

- Faire un "pnpm install" pour installer l'ensemble des dépendances.
