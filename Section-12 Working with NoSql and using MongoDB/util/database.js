//using mongodb

const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

let _db     //starting with _ means that we are using this variable for internal files only

const mongoConnect = (callback) => {
  mongoClient
    .connect(
      "mongodb+srv://mahmoodasad467:7NsdCvtmlXQj1kK0@cluster0.gmcmcss.mongodb.net/shop?retryWrites=true&w=majority"
    )
    .then(client => {
      console.log('Connected!!');
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No DataBase Found";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
