const asyncHandler = require("express-async-handler");
const Product = require("../models/product_model");

const createProduct = asyncHandler(async (req, res) => {
  const { name, type, price, rating, warranty_years, available } = req.body;
  if (!name || !type || !price || !rating || !warranty_years || !available) {
    res.status(400);
    throw new Error("Veuillez remplir tous les champs");
  }
  const product = await Product.create({
    name,
    type,
    price,
    rating,
    warranty_years,
    available,
  });
  console.log("Création du produit", product);
  if (product) {
    res.status(201).json(product);
  } else {
    res.status(400);
    throw new Error("Les données du produit ne sont pas valides");
  }
});

const getProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Produit introuvable");
  }
});

const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    res.status(201).send(products);
  } catch (error) {
    res.status(400).json({
      message: "Une erreur est survenue lors de la récupération des produits",
    });
  }
});

const modifyProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const { name, type, price, rating, warranty_years, available } = req.body;
  if (!name || !type || !price || !rating || !warranty_years || !available) {
    res.status(400);
    throw new Error("Veuillez remplir tous les champs");
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      name,
      type,
      price,
      rating,
      warranty_years,
      available,
    },
    { new: true }
  );
  console.log("Modification du produit", updatedProduct);
  if (updatedProduct) {
    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Produit introuvable");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const deletedProduct = await Product.findByIdAndDelete(productId);
  console.log("Suppression du produit", deletedProduct);
  if (deletedProduct) {
    res.status(200).json({ message: "Produit supprimé" });
  } else {
    res.status(404);
    throw new Error("Produit introuvable");
  }
});

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  modifyProduct,
  deleteProduct,
};
