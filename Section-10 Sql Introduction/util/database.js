const mysql = require('mysql2');

//To run a query on node a connection is established.
//For each query a new connection is established and the it is stopped after the query ends. Each query needs its own connection
//To run multiple queries simultaneously , it is slow process
//hence we create a pool of connections and whenever a new query runs, a new connection from the pool is established for that query
//pool can be finished once the application shuts down
const pool = mysql.createPool({     //we create a pool along with some js objects containing information about the database host we are connecting to
    host: 'localhost',  //host is the local machine
    user: 'root',   //username.... host and username gives us the server
    database: 'node-complete',      //telling the schema name
    password: 'Mysql123#'
});

module.exports = pool.promise();