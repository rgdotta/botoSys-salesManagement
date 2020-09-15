const Product = require("../models/productSchema");

exports.findAll = async (req, res) => {
  try {
    const products = await Product.find({}, (err) => {
      if (err) {
        console.log(`MONGO ERROR: ${err}`);
      }
    });

    const response = res.json(products);

    console.log(response);
  } catch (err) {
    console.log(`SERVER ERROR: ${err}`);
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
      type,
      code,
      name,
      photoURL,
      stock,
      psv,
      dimensions: {
        height: dimensions.height,
        length: dimensions.length,
        width: dimensions.width,
      },
      weight,
    });

    const saveProduct = await product.save();

    console.log(saveProduct);
  } catch (err) {
    console.log(`SERVER ERROR: ${err}`);
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const { id } = req.body;

    const product = await Product.findByIdAndDelete({ _id: id }, (err) => {
      if (err) {
        console.log(`MONGO ERROR: ${err}`);
      }
    });

    console.log(product);
  } catch (err) {
    console.log(`SERVER ERROR: ${err}`);
  }
};

exports.putOne = async (req, res) => {
  try {
    const {
      id,
      type,
      code,
      name,
      photoURL,
      stock,
      psv,
      dimensions,
      weight,
    } = req.body;

    const editProduct = await Product.findOneAndUpdate(
      { _id: id },
      {
        type,
        code,
        name,
        photoURL,
        stock,
        psv,
        dimensions: {
          height: dimensions.height,
          length: dimensions.length,
          width: dimensions.width,
        },
        weight,
      },
      (err) => {
        if (err) {
          console.log(`MONGO ERROR: ${err}`);
        }
      }
    );

    console.log(editProduct);
  } catch {
    console.log(`SERVER ERROR: ${err}`);
  }
};
