const express = require("express");
const router = express.Router();
const Product = require("../models/productSchema")

router.post("/", (req, res) => {
  const type = req.body.type,
        code = req.body.code,
        name = req.body.name,
        photo = req.body.photo,
        amount = req.body.amount,
        psv = req.body.psv;

  const product = new Product({
    type: type,
    code: code,
    name: name,
    photo: photo,
    amount: amount,
    psv: psv,
  })

  product.save();
})

router.get("/products", (req, res) => {
  Product.find({}, (err, products)=> {
    if(err){
      console.log(err);
    } else {
      res.json(products);
    }
  })
})

router.get("/products/findone", (req, res) => {
  //const filter = req.body.search;
  //await Product.find({})



})

module.exports = router;
