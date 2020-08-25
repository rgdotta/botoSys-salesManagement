const Product = require("../models/productSchema");

exports.findAll = async (req, res) => {
  try {
    const products = await Product.find({});

    res.json(products);
  } catch (err) {
    console.log(`ERROR: ${err}`);
  }
};

exports.createOne = async (req, res) => {
  try {
    const {
      type,
      code,
      name,
      photoURL,
      stock,
      psv,
      dimensions,
      weight,
    } = req.body;

    const product = new Product({
      type: type,
      code: code,
      name: name,
      photoURL: photoURL,
      stock: stock,
      psv: psv,
      dimensions: dimensions,
      weight: weight,
    });

    const saveProduct = await product.save();

    console.log(saveProduct);
  } catch (err) {
    console.log(`ERROR: ${err}`);
  }
};
