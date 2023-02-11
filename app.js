//http and fs are built-in nodejs modules that can be imported using the require method
//=>  HTTP allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP).
//=>file system module allows you to work with the file system on your computer.
const http = require('http');
const routes = require('./routes');
//=> The HTTP module creates an HTTP server that listens to server ports and gives a response back to the client.

//Use the createServer() method to create an HTTP server:
//whenever a request is made, a callback function is called which includes the request and response as two arguments
const server = http.createServer(routes);

//The server object listens on port mentioned(5500)
server.listen(5500);