const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Product.find()
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            products:docs.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    id: doc.id,
                    request :{
                        type: 'GET',
                        url: 'http://localhost:3000/products/' +doc.id
                    }
                }
            })
        }
        
        if(docs.length >= 0){
             res.status(200).json(response.products);
        }
         else{
             res.status(404).json({
                 message: 'No data in database'
             });
         }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => {
    
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product
        .save()
        .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Handling Post request to /products',
            createdProduct: product
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

});

router.get('/:productId', (req, res, next) => {

    const id = req.params.productId;

    Product.findById(id)
    .exec()
    .then(doc => {

        console.log("Data from database",doc);
        if(doc){
            res.status(200).json(doc);
        }
        else{
            res.status(404).json({
                message: 'can not find for provided ID'
            })
        }
       
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    });
   
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id})
    .exec()
    .then(result => {
        res.status(201).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        }); 
    });
});

module.exports = router;