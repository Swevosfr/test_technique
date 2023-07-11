const router = require("express").Router();
const productController = require("../controllers/productController");

router.post("/product", productController.createProduct);

router.get("/product/:id", productController.getProduct);

router.get("/product", productController.getProducts);

router.patch("/product/:id", productController.modifyProduct);

router.delete("/product/:id", productController.deleteProduct);

module.exports = router;
