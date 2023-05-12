const express = require("express");

const shopControllers = require("../controllers/shop");

const router = express.Router();
//use also accepts a path for routing
router.get("/", shopControllers.getIndex);
router.get("/products", shopControllers.getProducts);
// //colon tells express that productId is a variable(dynamic)
// //always put dynamic routing after all the static routing
router.get("/products/:productId", shopControllers.getProduct);
router.get("/cart", shopControllers.getCart);
router.post("/cart", shopControllers.postCart);
router.post('/create-order', shopControllers.postOrder);
router.get("/orders", shopControllers.getOrders);
// // // router.get("/checkout", shopControllers.getCheckout);
router.post("/delete-cart-product", shopControllers.postDeleteCartProduct);

module.exports = router;
