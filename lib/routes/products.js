const express = require("express");
const router = express.Router();
const Product = require("../models/productSchema")



router.get("/products", (req, res) => {
  const product = new Product({
    type: "Bola",
    code: "Xela",
    name: "Boludo",
    photo: "boladores",
    amount: 1,
    psv: 1.25,
  })
  product.save();

  const filter = "name";
  Product.find({}, (err, products)=> {
    if(!err){
      console.log(products);
    } else {console.log(err)}
  })
})

router.get("/products/findone", (req, res) => {
  //const filter = req.body.search;
  //await Product.find({})



})

module.exports = router;
