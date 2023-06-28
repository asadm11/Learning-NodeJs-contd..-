//For serving html pages, we need absolute paths and not relative paths. For this, we require paths module
const path = require("path");

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
const csurf = require("csurf");
const flash = require("connect-flash");
const multer = require("multer");

const MongoDB_URI =
  "mongodb+srv://mahmoodasad467:XqgwdWfc36GdDKze@cluster0.gmcmcss.mongodb.net/shop";

// const Product = require("./models/product");
// const User = require("./models/user");
// const Cart = require("./models/cart");
// const CartItem = require("./models/cartItem");
// const Order = require("./models/order");
// const OrderItem = require("./models/orderItem");

//The express module export a function, so, we're calling the express function and storing its return value in the app constant
const app = express();
const store = new MongoDBStore({
  uri: MongoDB_URI,
  collection: "sessions",
});

const fileStorage = multer.diskStorage({
  //multer storage engine
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

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
//bodyParser is used to extract data from the requests. urlencoded means that the data is text form.It won't parse files(like images). for that we use multer
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")); //dest will proved a local destination to store the images. .single means only a single file needs to be parsed with the name 'image' in form
//for linking css files, we have to statically serve them
app.use(express.static(path.join(__dirname, "public")));
app.use('/images', express.static(path.join(__dirname, "images")));


const csrfProtection = csurf(); //by default, session is used to staore csrf token

//Adding the sessions middleware
app.use(
  session({
    secret: "my secret", //a random unique string key used to authenticate a session. It is stored in an environment variable and can’t be exposed to the public.
    resave: false, //if true, it enables the session to be stored back to the session store, even if the session was never modified during the request
    saveUninitialized: false,
    store: store,
  }) //this allows any uninitialized session to be sent to the store. When a session is created but not modified, it is referred to as uninitialized.
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  // throw new Error('sync dummy');      //this will send the request handler to error handling middleware
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      // throw new Error('dummy');
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      // throw new Error(err);             //throwing an error inside an async code doesnt send it to the error handling middleware
      next(new Error(err));
    });
});

//expressjs allows us to have various middleware functions between the request and the response. use method allows us to add a new middleware function. It accepts an array of request handlers. next is a function that allows the user to travel to the next middleware
//For page filtering/funneling, we can check for path '/admin'
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get("/500", errorController.get500);

app.use(errorController.get404);

app.use((error, req, res, next) => {
  // res.redirect('/500');
  console.log(error.message);
  res.status(500).render("500", {
    pageTitle: "Error!",
    path: "/500",
    isAuthenticated: req.session.isLoggedIn,
  });
});

//=> The HTTP module creates an HTTP server that listens to server ports and gives a response back to the client. Use the createServer() method to create an HTTP server:whenever a request is made, a callback function is called which includes the request and response as two arguments

// const server = http.createServer(app);       :No need for this in expressjs, app.listen will do it for us

mongoose
  .connect(MongoDB_URI)
  .then((result) => {
    // User.findOne().then((user) => {
    //   if (!user) {
    //     const user = new User({
    //       name: "Asad",
    //       email: "mah@gmail.com",
    //       cart: {
    //         items: [],
    //       },
    //     });
    //     user.save();
    //   }
    // });
    app.listen(5500);
  })
  .catch((err) => {
    console.log(err);
  });
