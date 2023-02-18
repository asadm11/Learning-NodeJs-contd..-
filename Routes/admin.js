const express = require("express");
const path = require('path');

const rootDir = require('../util/path');

const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {

    //for hbs file
    res.render('add-product', {pageTitle: 'Add Product', path:'/admin/add-product', productCSS: true, formCSS: true, activeProduct: true});


    //for pug file
    // res.render('add-product', {pageTitle: 'Add Product', path:'/admin/add-product'});
    
    // console.log("This is another middleware!!");
    
    //static
    // res.send(`<form action='/admin/add-product' method='POST'> <input type='text' name='title'> <button type='submit'>Send</button></form>`);
    
    //for html
    // res.sendFile(path.join(rootDir, 'Views', 'add-product.html'))
});

//instead of 'use' we can use 'post' which works only in case of post request 
// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
    // console.log("In another middleware!");
    products.push({title: req.body.title});
    // console.log(req.body);
    res.redirect("/");
});

// module.exports = router;

exports.router = router;
exports.products = products;

