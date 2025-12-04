const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// Signature du token JWT
const signToken = id => {
  // A des fins de praticité, le secret JWT est défini en clair
  return jwt.sign({ id }, process.env.JWT_SECRET || 'jwt-alten-shop', {
    expiresIn: '90d'
  });
};

// Créer un compte utilisateur
exports.createAccount = async (req, res, next) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      firstname: req.body.firstname,
      email: req.body.email,
      password: req.body.password
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: { user: newUser }
    });
  } catch (error) {
    // Capture des erreurs (ex: email déjà existant)
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// Se connecter
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const token = signToken(user._id);

    res.status(200).json({ status: 'success', token });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};