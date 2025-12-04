# Alten Shop backend

## Installation 

> npm install

Le backend utilise un container mongodb:

> docker compose up -d

ou

> docker run --name altenshop -p 27017:27017 -d mongo:latest 

## Usage

Démarrer le backend:
> node index

Les routes disponibles sont les suivantes:

- POST http://localhost:3000/account > Créer un compte utilisateur (public)
- POST http://localhost:3000/token > Se connecter / récupérer un token JWT (public)

- GET http://localhost:3000/api/products/ > Récupérer tous les produits (user)
- GET http://localhost:3000/api/products/:id > Récupérer un produit par son id (user)

- POST http://localhost:3000/api/products/ > Créer un produit (admin)
- PATCH http://localhost:3000/api/products/:id > Mettre à jour un produit (admin)
- DELETE http://localhost:3000/api/products/:id > Supprimer un produit (admin)

- POST http://localhost:3000/api/user/cart > Ajouter un produit au panier (user)
- GET http://localhost:3000/api/user/cart > Voir le panier (user)
- DELETE http://localhost:3000/api/user/cart/:id > Supprimer un produit du panier (user)
- POST http://localhost:3000/api/user/wishlist > Ajouter un produit à la liste de souhaits (user)
- GET http://localhost:3000/api/user/wishlist > Voir la liste de souhaits (user)
- DELETE http://localhost:3000/api/user/wishlist/:id > Supprimer un produit de la liste de souhaits (user)

Une suite de tests Postman / Insomnia a été intégrée dans le dossier /tests. 
Les Bearer Token sont à remplacer dans les requêtes par les tokens générés par les routes /account ou /token. 



