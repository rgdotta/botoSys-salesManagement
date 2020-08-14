const express = require("express");
const router = express.Router();
const Client = require("../models/clientSchema")

router.get("/", (req, res) => {
  Client.find({}, (err, products)=> {
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

  const client = new Client({
    type: type,
    code: code,
    name: name,
    photo: photo,
    amount: amount,
    psv: psv,
  })

  client.save();
})

module.exports = router;
