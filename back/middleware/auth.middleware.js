const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Protection middleware
exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Vous n\'êtes pas connecté' });
    }

    // A des fins de praticité, le secret JWT est défini en clair
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'jwt-alten-shop');
    
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({ message: 'L\'utilisateur n\'existe plus' });
    }

    req.user = currentUser;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
};

// Restriction à l'admin 
exports.restrictToAdmin = (req, res, next) => {
  if (req.user.email !== 'admin@admin.com') {
    return res.status(403).json({ message: 'Accès refusé. Réservé à l\'admin.' });
  }
  next();
};