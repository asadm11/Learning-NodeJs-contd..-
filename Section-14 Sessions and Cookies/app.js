//http and fs are built-in nodejs modules that can be imported using the require method. HTTP allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP). file system module allows you to work with the file system on your computer.
// const http = require('http');

//importing express
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const errorController = require("./controllers/error");
const User = require("./models/user");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const MongoDB_URI =
  "mongodb+srv://mahmoodasad467:XqgwdWfc36GdDKze@cluster0.gmcmcss.mongodb.net/shop";

//For serving html pages, we need absolute paths and not relative paths. For this, we require paths module
const path = require("path");

// const Product = require("./models/product");
// const User = require("./models/user");
// const Cart = require("./models/cart");
// const CartItem = require("./models/cartItem");
// const Order = require("./models/order");
// const OrderItem = require("./models/orderItem");

//The express module export a function, so, we're calling the express function and storing its return value in the app constant
const app = express();
const store = new MongoDBStore({
  uri: "mongodb+srv://mahmoodasad467:XqgwdWfc36GdDKze@cluster0.gmcmcss.mongodb.net/shop",
  collection: "sessions",
});

app.set("view engine", "ejs");

//compile the dynamic html templates with the pug engine
// app.set('view engine', 'pug');
//and where to find the templates
app.set("views", "views");

const adminRoutes = require("./Routes/admin");
const shopRoutes = require("./Routes/shop");
const authRoutes = require("./Routes/auth");

app.get("/favicon.ico", (req, res) => res.sendStatus(204));

//for parsing the information
app.use(bodyParser.urlencoded({ extended: false }));
//for linking css files, we have to statically serve them
app.use(express.static(path.join(__dirname, "public")));

//Adding the sessions middleware
app.use(
  session({
    secret: "my secret", //a random unique string key used to authenticate a session. It is stored in an environment variable and can’t be exposed to the public.
    resave: false, //if true, it enables the session to be stored back to the session store, even if the session was never modified during the request
    saveUninitialized: false,
    store: store,
  }) //this allows any uninitialized session to be sent to the store. When a session is created but not modified, it is referred to as uninitialized.
);

app.use((req, res, next) => {
  if(!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

//expressjs allows us to have various middleware functions between the request and the response. use method allows us to add a new middleware function. It accepts an array of request handlers. next is a function that allows the user to travel to the next middleware
//For page filtering/funneling, we can check for path '/admin'
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

//=> The HTTP module creates an HTTP server that listens to server ports and gives a response back to the client. Use the createServer() method to create an HTTP server:whenever a request is made, a callback function is called which includes the request and response as two arguments

// const server = http.createServer(app);       :No need for this in expressjs, app.listen will do it for us

mongoose
  .connect(MongoDB_URI)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Asad",
          email: "mah@gmail.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(5500);
  })
  .catch((err) => {
    console.log(err);
  });
