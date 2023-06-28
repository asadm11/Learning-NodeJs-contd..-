const path = require("path");
const express = require("express");

const adminControllers = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");
const { body } = require("express-validator");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", isAuth, adminControllers.getAddProduct); //we can add multiple handlers for any route and they will be funneled from left to right
//for authentication, the isauth hendler will be served first, if we are login we'll move to the next handler else we will be returned/redirected
// // /admin/products => GET
router.get("/products", isAuth, adminControllers.getProducts);

// //instead of 'use' we can use 'post' which works only in case of post request
// // /admin/add-product => POST
router.post(
  "/add-product",
  isAuth,
  body("title").isString().isLength({ min: 3 }).trim(),
  body("price").isFloat(),
  body("description").isLength({ min: 5, max: 400 }).trim(),
  adminControllers.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminControllers.getEditProduct);

router.post(
  "/edit-product",
  isAuth,
  body("title").isString().isLength({ min: 3 }).trim(),
  body("price").isFloat(),
  body("description").isLength({ min: 5, max: 400 }).trim(),
  adminControllers.postEditProduct
);

router.post("/delete-product", isAuth, adminControllers.postDeleteProduct);

module.exports = router;

// exports.router = router;
