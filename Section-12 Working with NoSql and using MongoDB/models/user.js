const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

// const objectId = mongodb.ObjectId;

class User {
  constructor(name, email, id, cart) {
    this.name = name;
    this.email = email;
    this._id = new mongodb.ObjectId(id);
    this.cart = cart; //{itmes: }
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      //id already exists
      dbOp = db
        .collection("users")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection("users").insertOne(this);
    }
    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    if (cartProductIndex >= 0) {
      newQuantity = updatedCartItems[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new mongodb.ObjectId(product._id),
        quantity: 1,
      });
    }
    const updatedCart = { items: updatedCartItems };
    const db = getDb();
    return db
      .collection("users")
      .updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
  }

  getCart() {
    const db = getDb();
    const productIds = [];
    const quantities = {};
    this.cart.items.forEach((ele) => {
      let prodId = ele.productId;
      productIds.push(prodId);
      quantities[prodId] = ele.quantity;
    });
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return { ...p, quantity: quantities[p._id] };
        });
      });
    // const db = getDb();
    // const productIds = this.cart.items.map((i) => {
    //   return i.productId;
    // });
    // return db
    //   .collection("products")
    //   .find({ _id: { $in: [productIds] } })
    //   .toArray()
    //   .then((products) => {
    //     return products.map((p) => {
    //       return {
    //         ...p,
    //         quantity: this.cart.items.find((i) => {
    //           return i.productId.toString() === p._id.toString();
    //         }),
    //       }.quantity;
    //     });
    //   });
  }

  deleteItemFromCart(productId) {
    const updatedCartItems = this.cart.items.filter((item) => {
      return item.productId.toString() !== productId.toString();
    });
    const updatedCart = { items: updatedCartItems };
    const db = getDb();
    return db
      .collection("users")
      .updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
  }

  addOrder() {
    const db = getDb();
    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: {
            _id: this._id,
            name: this.name,
          },
        };
        return db.collection("orders").insertOne(order);
      })
      .then((result) => {
        this.cart = { items: [] };
        return db
          .collection("users")
          .updateOne({ _id: this._id }, { $set: { cart: { items: [] } } });
      });
  }

  getOrders() {
    const db = getDb();
    return db.collection("orders").find({ "user._id": this._id }).toArray();
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) }) //mongodb stores id's in _id variable and it stores it in a bson(binary) format, therefore we have to convert our id into a bson format
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
