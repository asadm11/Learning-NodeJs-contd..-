//http and fs are built-in nodejs modules that can be imported using the require method
//=>  HTTP allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP).
//=>file system module allows you to work with the file system on your computer.
const http = require('http');

//importing express
const express = require('express');
const bodyParser = require('body-parser');

//The express module export a function, so, we're calling the express function and storing its return value in the app constant
const app = express();

app.get('/favicon.ico', (req, res) => res.sendStatus(204));

//expressjs allows us to have various middleware functions between the request and the response
//use method allows us to add a new middleware function
//It accepts an array of request handlers
//next is a function that allows the user to travel to the next middleware
//use also accepts a path for routing

app.use(bodyParser.urlencoded({extended: true}));



app.use('/add-product', (req, res, next) => {
    console.log("This is another middleware!!");
    res.send(`<form action='/product' method='POST'> <input type='text' name='title'> <button type='submit'>Send</button></form>`);
});

//instead of 'use' we can use 'post' which works only in case of post request 
app.post('/product', (req, res, next) => {
    console.log("In another middleware!");
    console.log(req.body);
    res.redirect("/");
});

app.use('/', (req, res, next) => {
    res.send(`<h1> Hey There!</h1>`);
    console.log("Hello expressJS!");
});


//=> The HTTP module creates an HTTP server that listens to server ports and gives a response back to the client.

//Use the createServer() method to create an HTTP server:
//whenever a request is made, a callback function is called which includes the request and response as two arguments

// const server = http.createServer(app);       :No need for this in expressjs, app.listen will do it for us

//The server object listens on port mentioned(5500)
app.listen(5500);