const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Routes protégées
router.use(authMiddleware.protect);

// Routes pour la gestion du panier + la liste de souhaits
// utilisateur connecté requis
router.get('/cart', userController.getCart);
router.post('/cart', userController.addToCart);
router.delete('/cart/:productId', userController.removeFromCart);
router.get('/wishlist', userController.getWishlist);
router.post('/wishlist', userController.addToWishlist);
router.delete('/wishlist/:productId', userController.removeFromWishlist);

module.exports = router;