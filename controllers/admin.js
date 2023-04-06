const Product = require("../models/product");


exports.getAddProduct = (req, res, next) => {
    //for hbs file
    res.render("admin/add-product", {
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
    const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const productId = req.body.id;
  const product = new Product(title, imageUrl, description, price, productId);
  product.save();
  res.redirect('/');
  };


  exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render("admin/products", {
          prods: products,
          pageTitle: "Admin Products",
          path: "/admin/products",
        });
      });
  };