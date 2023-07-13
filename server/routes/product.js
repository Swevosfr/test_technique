const router = require("express").Router();
const productController = require("../controllers/productController");

router.post("/", productController.createProduct);

router.get("/:id", productController.getProduct);

router.get("/", productController.getProducts);

router.patch("/:id", productController.modifyProduct);

router.delete("/:id", productController.deleteProduct);

module.exports = router;
