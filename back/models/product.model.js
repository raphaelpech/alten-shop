const mongoose = require('mongoose');

// Schéma Product
const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String, 
    default: ''
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  internalReference: {
    type: String,
  },
  shellId: {
    type: Number
  },
  inventoryStatus: {
    type: String,
    required: true,
    enum: {
      values: ['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK']
    }
  },
  rating: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Number,
    default: () => Date.now() 
  },
  updatedAt: {
    type: Number,
    default: () => Date.now()
  }
});

// Mise à jour de la date de modification avant chaque save en db
productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  if (typeof next === 'function') {
    next();
  }
});

// Création du modèle Product
const Product = mongoose.model('Product', productSchema);

module.exports = Product;