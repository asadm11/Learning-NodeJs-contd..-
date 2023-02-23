const express = require("express");

const productControllers = require("../controllers/product");

const router = express.Router();
//use also accepts a path for routing
router.get("/", productControllers.getProducts);

module.exports = router;
