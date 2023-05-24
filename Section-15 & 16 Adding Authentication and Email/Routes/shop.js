const express = require("express");

const shopControllers = require("../controllers/shop");
const isAuth = require('../middleware/is-auth');

const router = express.Router();
//use also accepts a path for routing
router.get("/", shopControllers.getIndex);
router.get("/products", shopControllers.getProducts);
// //colon tells express that productId is a variable(dynamic)
// //always put dynamic routing after all the static routing
router.get("/products/:productId", shopControllers.getProduct);
router.get("/cart", isAuth, shopControllers.getCart);                                               //we can add multiple handlers for any route and they will be funneled from left to right
router.post("/cart", isAuth, shopControllers.postCart);                                             //for authentication, the isauth hendler will be served first, if we are login we'll move to the next handler else we will be returned/redirected
router.post('/create-order', isAuth, shopControllers.postOrder);
router.get("/orders", isAuth, shopControllers.getOrders);
// // // router.get("/checkout", shopControllers.getCheckout);
router.post("/delete-cart-product", isAuth, shopControllers.postDeleteCartProduct);

module.exports = router;
