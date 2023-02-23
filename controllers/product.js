const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  //for hbs file
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    productCSS: true,
    formCSS: true,
    activeProduct: true,
  });
  //for pug file
  // res.render('add-product', {pageTitle: 'Add Product', path:'/admin/add-product'});

  // console.log("This is another middleware!!");

  //static
  // res.send(`<form action='/admin/add-product' method='POST'> <input type='text' name='title'> <button type='submit'>Send</button></form>`);

  //for html
  // res.sendFile(path.join(rootDir, 'Views', 'add-product.html'))
};

exports.postAddProduct = (req, res, next) => {
  // console.log("In another middleware!");
  // console.log(req.body);
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll();
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
};
