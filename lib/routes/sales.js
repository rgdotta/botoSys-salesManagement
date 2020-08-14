const express = require("express");
const router = express.Router();
const Sale = require("../models/saleSchema")

router.get("/", (req, res) => {
  Sale.find({}, (err, products)=> {
    if(err){
      console.log(err);
    } else {
      res.json(products);
    }
  })
})

router.post("/", (req, res) => {
  const type = req.body.type,
        code = req.body.code,
        name = req.body.name,
        photo = req.body.photo,
        amount = req.body.amount,
        psv = req.body.psv;

  const sale = new Sale({
    type: type,
    code: code,
    name: name,
    photo: photo,
    amount: amount,
    psv: psv,
  })

  sale.save();
})

module.exports = router;
