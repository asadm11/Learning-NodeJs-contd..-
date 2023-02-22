const express = require("express");
const path = require("path");

const rootDir = require("../util/path");
const adminData = require("./admin");

const router = express.Router();
//use also accepts a path for routing
router.get("/", (req, res, next) => {
  const products = adminData.products;

  //it will use the default templating engine and will return that template
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
  });

  //for pug file
  // res.render('shop', {prods: products, pageTitle: 'Shop', path:'/shop'} );

  // console.log(adminData.products);

  // res.sendFile(path.join(rootDir, 'Views', 'shop.html'));

  // res.sendFile(path.join(__dirname, '../', 'Views', 'shop.html'));

  // res.send(`<h1> Hey There!</h1>`);

  // console.log("Hello expressJS!");
});

module.exports = router;
