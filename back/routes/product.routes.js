const express = require('express');
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Routes protégées
router.use(authMiddleware.protect);

// Routes pour les produits 
// avec restriction admin pour créer/modifier/supprimer des produits
router.route('/')
  .get(productController.getAllProducts)
  .post(authMiddleware.restrictToAdmin, productController.createProduct);

router.route('/:id')
  .get(productController.getProduct)
  .patch(authMiddleware.restrictToAdmin, productController.updateProduct)
  .delete(authMiddleware.restrictToAdmin, productController.deleteProduct);


module.exports = router;