const { parse } = require('dotenv');
const express=require('express');
const router=express.Router();

let products=[];

// GET - Fetch all products
router.get('/',(req,res)=>{
    res.render('products',{title:'Product List',products});
});

// POST - Add a new product
router.post('/add',(req,res)=>{
    const newProduct={
        id:products.length + 1,
        name:req.body.name,
        price:req.body.price,
    };
    products.push(newProduct);
    res.redirect('/products');

});


// PUT - Update a product (using a form)
router.post('/edit/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const productIndex=products.findIndex(products=>products.id===id);
    products[productIndex]={id,name:req.body.name,price:req.body.price};
    res.redirect('/products');

});


// DELETE - Delete a product
router.post('/delete/:id',(req,res)=>{
      const id=parseInt(req.params.id);
      products=products.filter(product=>product.id !==id);
      res.redirect('/products');
});

module.exports = router;