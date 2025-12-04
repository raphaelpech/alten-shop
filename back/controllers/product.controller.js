import Product from '../models/product.model.js';

// Gestion d'erreurs simple
const handleError = (res, error) => {
  console.error(error);
  res.status(400).json({ status: 'fail', message: error.message });
};

// Créer un produit
export const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { product: newProduct }
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Récupérer tous les produits
export const getAllProducts = async (_req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      status: 'success',
      results: products.length,
      data: { products }
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Récupérer un produit par ID
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });

    if (!product) {
      return res.status(404).json({ status: 'fail', message: "Le produit n'a pas été trouvé" });
    }

    res.status(200).json({
      status: 'success',
      data: { product }
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Mettre à jour un produit
export const updateProduct = async (req, res) => {
  try {

    const product = await Product.findOneAndUpdate(
      { id: req.params.id }, 
      req.body, 
      {
        new: true, 
        runValidators: true 
      }
    );

    if (!product) {
      return res.status(404).json({ status: 'fail', message: "Le produit n'a pas été trouvé" });
    }

    res.status(200).json({
      status: 'success',
      data: { product }
    });

  } catch (error) {
    handleError(res, error);
  }
};

// Supprimer un produit
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ id: req.params.id });

    if (!product) {
      return res.status(404).json({ status: 'fail', message: "Le produit n'a pas été trouvé" });
    }

    res.status(204).json({
      status: 'success',
      data: null
    });

  } catch (error) {
    handleError(res, error);
  }
};