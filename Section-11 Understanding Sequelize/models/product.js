const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Product = sequelize.define('product', {       //.define will define a model of a product table which will be converted to a table whenever the server starts though sequelize.sync in app.js
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Product;