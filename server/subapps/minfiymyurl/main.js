const express = require('express');
//const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
//const app = next({ dev })
//Middleware
const bodyParser = require('body-parser')
//Controllers
//Configuration
const og = require('../../utils/og');
//Routes

const webapiroute = require('./webapi')

var path = require('path');
var filepath = path.join(__dirname, 'files');
//Express Server Main Function
const server = express();

server.use(bodyParser.json({limit:'5mb'}));
server.use(bodyParser.urlencoded({limit:'5mb',extended: true}));
server.use('/webapi',webapiroute);
server.use("/services/ogdata/:url", og.info)
module.exports = server