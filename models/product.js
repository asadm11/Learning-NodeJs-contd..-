const fs = require("fs");
const path = require("path");

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    // products.push(this);
    const p = path.join(
      path.dirname(require.main.filename),
      "data",
      "products.json"
    );
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);     //json.parse converts the json data into javascript
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {      //stringify converts the javascript data into json data
        console.log(err);
      });
    });
  }

  //static keyword makes the function dependent upon the class and not an object of the class
  //cb is a callback function passed as an argument in fetchall which is invoked when the fetchAll function completes it's process
  //we need to do this because readFile is an async process
  static fetchAll(cb) {
    const p = path.join(
      path.dirname(require.main.filename),
      "data",
      "products.json"
    );
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        //calling the callback function
        cb([]);
      }
      //calling the callback function
      cb(JSON.parse(fileContent));
    });
    // return products;
  }
};
