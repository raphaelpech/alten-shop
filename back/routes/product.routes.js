const express = require('express');
const productController = require('../controllers/product.controller');

const router = express.Router();

// 2 routes: 1 pour tous les produits, 1 pour créer un produit
router
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.createProduct);

// 3 routes: 1 pour récupérer, 1 pour mettre à jour, 1 pour supprimer un produit par ID
router
  .route('/:id')
  .get(productController.getProduct)
  .patch(productController.updateProduct) 
  .delete(productController.deleteProduct);

module.exports = router;