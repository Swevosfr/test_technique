const router = require("express").Router();
const productController = require("../controllers/productController");

router.post("/product", productController.createProduct);

router.get("/product/:id", productController.getProduct);

router.get("/product", productController.getProducts);

router.patch("/product", productController.modifyProduct);

router.delete("/product", productController.deleteProduct);

module.exports = router;
