const asyncHandler = require("express-async-handler");
const Product = require("../models/product_model");

const createProduct = asyncHandler(async (req, res) => {
  res.json({ message: "Creation de produit" });
});

const getProduct = asyncHandler(async (req, res) => {
  res.json({ message: "Lire le produit" });
});

const modifyProduct = asyncHandler(async (req, res) => {
  res.json({ message: "Modifier le produit" });
});

const deleteProduct = asyncHandler(async (req, res) => {
  res.json({ message: "Suppression du produit" });
});

module.exports = { createProduct, getProduct, modifyProduct, deleteProduct };
