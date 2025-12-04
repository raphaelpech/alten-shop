const User = require('../models/user.model');

// Ajouter un produit au panier
exports.addToCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const { productId, quantity } = req.body;

        const existingIndex = user.cart.findIndex(item => item.productId === productId);
        
        if (existingIndex > -1) {
            user.cart[existingIndex].quantity += quantity || 1;
        } else {
            user.cart.push({ productId, quantity: quantity || 1 });
        }

        await user.save({ validateBeforeSave: false });
        res.status(200).json({ status: 'success', data: user.cart });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un produit du panier
exports.removeFromCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.cart = user.cart.filter(item => item.productId !== parseInt(req.params.productId));
        await user.save({ validateBeforeSave: false });
        res.status(200).json({ status: 'success', data: user.cart });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Ajouter un produit à la liste de souhaits
exports.addToWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { productId } = req.body;

    const alreadyAdded = user.wishlist.find(item => item.productId === productId);

    if (!alreadyAdded) {
      user.wishlist.push({ productId });
    }

    await user.save({ validateBeforeSave: false });
    res.status(200).json({ status: 'success', data: user.wishlist });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un produit de la liste de souhaits
exports.removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const productIdToRemove = parseInt(req.params.productId);

    user.wishlist = user.wishlist.filter(item => item.productId !== productIdToRemove);
    
    await user.save({ validateBeforeSave: false });
    res.status(200).json({ status: 'success', data: user.wishlist });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Récupérer le panier de l'utilisateur
exports.getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({ status: 'success', data: user.cart });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Récupérer la liste de souhaits de l'utilisateur
exports.getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({ status: 'success', data: user.wishlist });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};