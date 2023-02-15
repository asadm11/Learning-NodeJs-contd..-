const express = require("express");
const path = require('path');

const rootDir = require('../util/path');

const router = express.Router();

//use also accepts a path for routing
router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'Views', 'shop.html'));
    // res.sendFile(path.join(__dirname, '../', 'Views', 'shop.html'));
    // res.send(`<h1> Hey There!</h1>`);
    // console.log("Hello expressJS!");
});

module.exports = router;