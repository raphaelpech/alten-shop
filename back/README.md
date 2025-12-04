# Alten Shop backend

## Installation DB
Le backend utilise un container mongodb:

> docker compose up -d

dans le dossier /back

ou

> docker run --name altenshop -p 27017:27017 -d mongo:latest 

## Usage

Démarrer le backend:
> node index

Les routes disponibles sont les suivantes:

- GET http://localhost:3000/api/products/ > Récupérer tous les produits
- GET http://localhost:3000/api/products/:id > Récupérer un produit par son id
- POST http://localhost:3000/api/products/ > Créer un produit 
- PATCH http://localhost:3000/api/products/:id > Mettre à jour un produit
- DELETE http://localhost:3000/api/products/:id > Supprimer un produit

Une suite de tests Postman / Insomnia a été intégrée dans le dossier /tests. 


