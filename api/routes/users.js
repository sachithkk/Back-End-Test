const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const User = require('../models/user');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'User were fetched'
    });
});

router.post('/login', (req, res, next) => {

    const userlogin = new User({
        username : req.body.username,
        password : req.body.password
    });

    userlogin.findOne({username: username, password: password})
     .then(result => {
         console.log(result, " 9090");
         res.status(200).json(result+"User find");
     })
     .cathc(err => {
         console.log(err, " 1234");
         res.status(500).json({
             error: err
         });
     });

});

router.post('/register', (req, res, next) => {

    const user = new User({

         username : req.body.username,
         password : req.body.password,
         firstname : req.body.firstname,
         lastname : req.body.lastname
    });

    user
     .save()
     .then(result => {
        console.log(result);
        res.status(200).json(result);
     })
     .catch(err => {
         console.log(err);
         res.status(500).json({
            error: err
         });
     });
});

module.exports = router;