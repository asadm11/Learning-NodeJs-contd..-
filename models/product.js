const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      //calling the callback function
      cb([]);
    } else {
        //calling the callback function
        cb(JSON.parse(fileContent));
    }
    
  });
};

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    // products.push(this);
    getProductsFromFile(products => {
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          //stringify converts the javascript data into json data
          console.log(err);
        });
    });      
    };

  //static keyword makes the function dependent upon the class and not an object of the class
  //cb is a callback function passed as an argument in fetchall which is invoked when the fetchAll function completes it's process
  //we need to do this because readFile is an async process
  static fetchAll(cb) {
    getProductsFromFile(cb);
    // return products;
  }
};
