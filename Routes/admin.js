const express = require("express");
const path = require('path');

const rootDir = require('../util/path');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    console.log("This is another middleware!!");
    // res.send(`<form action='/admin/add-product' method='POST'> <input type='text' name='title'> <button type='submit'>Send</button></form>`);
    res.sendFile(path.join(rootDir, 'Views', 'add-product.html'))
});

//instead of 'use' we can use 'post' which works only in case of post request 
// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
    console.log("In another middleware!");
    console.log(req.body);
    res.redirect("/");
});

module.exports = router;

