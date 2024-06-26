const express = require("express");
const router = express.Router();
const productController = require("../controllers/products");

router.post("/user/create", productController.createProduct);

module.exports = router;
