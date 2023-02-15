//http and fs are built-in nodejs modules that can be imported using the require method. HTTP allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP). file system module allows you to work with the file system on your computer.
// const http = require('http');

//importing express
const express = require('express');
const bodyParser = require('body-parser');

//For serving html pages, we need absolute paths and not relative paths. For this, we require paths module 
const path = require('path');

//The express module export a function, so, we're calling the express function and storing its return value in the app constant
const app = express();

const adminRoutes = require("./Routes/admin");
const shopRoutes = require("./Routes/shop");

app.get('/favicon.ico', (req, res) => res.sendStatus(204));

//for parsing the information
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


//expressjs allows us to have various middleware functions between the request and the response. use method allows us to add a new middleware function. It accepts an array of request handlers. next is a function that allows the user to travel to the next middleware
//For page filtering/funneling, we can check for path '/admin' 
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    // res.status(404).send(`<h1>Page Not Found!`);
    res.status(404).sendFile(path.join(__dirname, 'Views', '404.html'));        //__dirname gives the absolute path for the current folder. Using commas we can concatenate the path upto the target file
})

//=> The HTTP module creates an HTTP server that listens to server ports and gives a response back to the client. Use the createServer() method to create an HTTP server:whenever a request is made, a callback function is called which includes the request and response as two arguments

// const server = http.createServer(app);       :No need for this in expressjs, app.listen will do it for us

//The server object listens on port mentioned(5500)
app.listen(5500);