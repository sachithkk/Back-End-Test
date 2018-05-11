 const express = require('express');
 const app = express();
 const morgan = require('morgan');
 const bodyParser = require('body-parser');
 const mongoose = require('mongoose');
 const cors = require("cors");

 // database connection
 mongoose.connect("mongodb://localhost:27017/Shop", (err) => {
    if(err){console.log(err);}
    else{console.log("Connection establish")}
 });

 const productRouter = require('./api/routes/products');
 const orderRouter = require('./api/routes/orders');
 const userRouter = require('./api/routes/users');

 
 app.use(morgan('dev'));
 app.use(bodyParser.urlencoded({extended: false}));
 app.use(bodyParser.json());
 app.use(cors());


 // handle cors errors
//  app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//         "Access-Control-Allow-Header",
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );

//     if(req.method === 'OPTION'){
//         res.header('Access-Control-Allow-methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }
//     next();
//  })

 // end of cors error handling



 app.use('/products', productRouter);
 app.use('/orders', orderRouter);
 app.use('/users', userRouter);

 //error handling.
 app.use((req, res, next) => {
     const error = new Error('Not found');
     error.statua = 404;
     next(error);
 });

 app.use((error, req, res, next) =>{
     res.status(error.status || 500);
     res.json({
         error: {
             message: error.message
         }
     });
 });

 module.exports = app;