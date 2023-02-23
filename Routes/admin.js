const express = require("express");

const productControllers = require("../controllers/product");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", productControllers.getAddProduct);

//instead of 'use' we can use 'post' which works only in case of post request
// /admin/add-product => POST
router.post("/add-product", productControllers.postAddProduct);

module.exports = router;

// exports.router = router;
