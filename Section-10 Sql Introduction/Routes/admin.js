const path = require('path');

const express = require("express");

const adminControllers = require("../controllers/admin");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminControllers.getAddProduct);

// /admin/products => GET
router.get("/products", adminControllers.getProducts);


//instead of 'use' we can use 'post' which works only in case of post request
// /admin/add-product => POST
router.post("/add-product", adminControllers.postAddProduct);

router.get("/edit-product/:productId", adminControllers.getEditProduct);

router.post("/edit-product", adminControllers.postEditProduct);

router.post("/delete-product", adminControllers.postDeleteProduct);


module.exports = router;

// exports.router = router;
