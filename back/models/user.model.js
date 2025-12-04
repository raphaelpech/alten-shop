const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  firstname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [
    {
      productId: { type: Number },
      quantity: { type: Number, default: 1 }
    }
  ],
  wishlist: [
    {
      productId: { type: Number, required: true },
      _id: false 
    }
  ]
});

userSchema.pre('save', async function(next) {
  // Si le mot de passe n'a pas été modifié, on continue
  if (!this.isModified('password')) {
    return typeof next === 'function' ? next() : undefined;
  }

  // Hashage du mot de passe
  this.password = await bcrypt.hash(this.password, 12);
  
  // Fix pour appeler next() seulement si une fonction est fournie
  if (typeof next === 'function') {
    next();
  }
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;