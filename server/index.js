const express = require('express')
const mongoose = require('mongoose');
const path = require('path');
var cors = require('cors')

//Configuration
const dbconfig = require('./config');
const routes = require('../nextroutes/defaultroute')
const next = require('next')

const port = process.env.PORT || 3000
const dev = (process.env.NODE_ENV !== 'production')||(process.env.NODE_ENV !== 'beta');
const app = next({ dev })
const handle = routes.getRequestHandler(app)

//Routes


//SubApps
const minifiy = require('./subapps/minfiymyurl/main')
//MiddleWare


//const 3 = require('./services/auth');
const robotsOptions = {
  root: path.join(__dirname, "../public"),
  headers: {
    'Content-Type': 'text/plain;charset=UTF-8'
  }
}


mongoose.connect(dbconfig.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('DB Connected Sucessfully'))
  .catch(err => console.log("Error Occurred in DB Connection \n"))

app.prepare()
  .then(() => {
    const mainserver = express()
    //--- HTTP HTTPS ---//
    mainserver.use("*",function(req,res,next){
      //var 
      next();
    });
   //--- CORS---//
    mainserver.all("*",function (req, res, next) {
      var origin = req.get('origin');
      res.header("Access-Control-Allow-Origin", origin);
      res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-type,Accept,authorization,x-auth-token");
      next();
    });
    mainserver.options("*",cors(),function(req,res,next){
      return res.status(200);
    })

  //-- CORS END ---//
  //-- SEO ---//
    mainserver.get('/robots.txt', (req, res) => {
      return res.status(200).sendFile('robots.txt', robotsOptions);
    });
    //-- SEO END ---//
    mainserver.use("/minurl",minifiy);
    mainserver.use((err, req, res, next) => {
      if (err) {
        return res.status(500).json({ "Status": "Error", "Info": err })
      }
    })
    mainserver.use(handle);
    mainserver.listen(port, err => {
      if (err) {
        throw err
      }
      console.log('Server Started')
    })
  })
  .catch((ex) => {
    console.log(ex)
    process.exit(1)
  })
  setInterval(() => {
    console.log("hi");
  }, 5000);