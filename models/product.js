const products = [];

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    products.push(this);
  }

  //static keyword makes the function dependent upon the class and not an object of the class
  static fetchAll() {
    return products;
  }
};
