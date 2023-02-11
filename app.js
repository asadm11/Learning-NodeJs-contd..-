//http and fs are built-in nodejs modules that can be imported using the require method
//=>  HTTP allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP).
//=>file system module allows you to work with the file system on your computer.
const http = require('http');

//importing express
const express = require('express');

//The express module export a function, so, we're calling the express function and storing its return value in the app constant
const app = express();

//expressjs allows us to have various middleware functions between the request and the response
//use method allows us to add a new middleware function
//It accepts an array of request handlers
//next is a function that allows the user to travel to the next middleware
app.use((req, res, next) => {
    console.log("This is the middleware!");
    next();
});

app.use((req, res, next) => {
    console.log("This is another middleware!!");
    res.send(`<h1> Response from express!!</h1> `);
});


//=> The HTTP module creates an HTTP server that listens to server ports and gives a response back to the client.

//Use the createServer() method to create an HTTP server:
//whenever a request is made, a callback function is called which includes the request and response as two arguments
// const server = http.createServer(app);       :No need for this in expressjs, app.listen will do it for us

//The server object listens on port mentioned(5500)
app.listen(5500);