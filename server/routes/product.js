const router = require("express").Router();
const productController = require("../controllers/productController");
const Authorization = require("../middleware/Authorization");

router.post("/", Authorization, productController.createProduct);

router.get("/:id", Authorization, productController.getProduct);

router.get("/", Authorization, productController.getProducts);

router.patch("/:id", Authorization, productController.modifyProduct);

router.delete("/:id", Authorization, productController.deleteProduct);

module.exports = router;
