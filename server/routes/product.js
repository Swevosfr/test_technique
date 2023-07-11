const router = require("express").Router();
const productController = require("../controllers/productController");

router.post("/product", productController.createProduct);

router.get("/product", productController.getProduct);

router.patch("/product", productController.modifyProduct);

router.delete("/product", productController.deleteProduct);

module.exports = router;
