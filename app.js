//http and fs are built-in nodejs modules that can be imported using the require method
//=>  HTTP allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP).
//=>file system module allows you to work with the file system on your computer.
const http = require('http');
const fs = require('fs');

//=> The HTTP module creates an HTTP server that listens to server ports and gives a response back to the client.

//Use the createServer() method to create an HTTP server:
//whenever a request is made, a callback function is called which includes the request and response as two arguments
const server = http.createServer((req, res) => {
    const url = req.url;    //url of the request
    const method = req.method;      //get(to read) or post(to write on the server) method

    if (url === '/') {      //localhost or main page
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action = "/message" method =  "POST"><input type = "text" name = "message"><button type = "submit">Send</button></input></form></body>');        //action is the url and name is the reference of the input that is used by the server. It saves it in the key value pair where key  = name and value = whatever is entered by the user
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        //.on are event listeners or event emitters.
        //the data event is fired when there is available to read
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        //.end is fired when there is no more data to read
        req.on('end', () => {
            const parsedData = Buffer.concat(body).toString();      //Buffers are temporary storage spots for a chunk of data that is being transferred from one place to another.
            const message = parsedData.split('=')[1];
            fs.writeFileSync('message.txt', message);
            console.log(body);
            console.log(parsedData);
            console.log(message);
        });
        res.statusCode = 302;       //It is the http response status codes. 300-399 is used for redirection messages. Therefore, a combination of status code and setHeader(location) redirects the page.
        res.setHeader('Location', '/');
        return res.end();
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body>Hii there, this is my first node js server response</body>');
    res.write('</html>');
    res.end();
})

//The server object listens on port mentioned(5500)
server.listen(5500);