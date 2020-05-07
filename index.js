//const socketLib = require('./libs/socketLib');
const express = require('express');
const body_parser = require('body-parser');
const http = require('http');
const socketLib = require('./libs/socketLib');

//middleware imports
const cors = require("./middlewares/cors");

//routes import
const users = require('./routes/users.js'); 
 

const app = express();

//body parser middleware
app.use(express.json());

app.use(body_parser.urlencoded({extended : false}));
app.use(cors);

//routes
app.use('/user',users);

//express global error handler



const server = http.createServer(app);
server.listen(3000,()=>{console.log("Started")});


socketLib(server);


