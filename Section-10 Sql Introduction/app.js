//http and fs are built-in nodejs modules that can be imported using the require method. HTTP allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP). file system module allows you to work with the file system on your computer.
// const http = require('http');

//importing express
const express = require("express");
const bodyParser = require("body-parser");

//For serving html pages, we need absolute paths and not relative paths. For this, we require paths module
const path = require("path");
const db = require('./util/database');

//The express module export a function, so, we're calling the express function and storing its return value in the app constant
const app = express();

app.set("view engine", "ejs");

//compile the dynamic html templates with the pug engine
// app.set('view engine', 'pug');
//and where to find the templates
app.set("views", "views");

const adminRoutes = require("./Routes/admin");
const shopRoutes = require("./Routes/shop");
const errorController = require("./controllers/error");

app.get("/favicon.ico", (req, res) => res.sendStatus(204));

db.execute('SELECT * FROM products')
.then(result => {
    // console.log(result);
})
.catch(err => {
    console.log(err);
});


//for parsing the information
app.use(bodyParser.urlencoded({ extended: false }));
//for linking css files, we have to statically serve them
app.use(express.static(path.join(__dirname, "public")));


//expressjs allows us to have various middleware functions between the request and the response. use method allows us to add a new middleware function. It accepts an array of request handlers. next is a function that allows the user to travel to the next middleware
//For page filtering/funneling, we can check for path '/admin'
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//=> The HTTP module creates an HTTP server that listens to server ports and gives a response back to the client. Use the createServer() method to create an HTTP server:whenever a request is made, a callback function is called which includes the request and response as two arguments

// const server = http.createServer(app);       :No need for this in expressjs, app.listen will do it for us

//The server object listens on port mentioned(5500)
app.listen(5500);
