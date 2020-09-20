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
    console.log(`DB ERROR: ${err}`);
  }
};

exports.createOne = async (req, res) => {
  try {
    const product = req.body;

    const newProduct = new Product({
      type: product.type,
      code: product.code,
      name: product.name,
      photoURL: product.photoURL,
      stock: product.stock,
      psv: product.psv,
      dimensions: {
        height: product.dimensions.height,
        length: product.dimensions.length,
        width: product.dimensions.width,
      },
      weight: product.weight,
    });

    const saveProduct = await newProduct.save();

    console.log(saveProduct);
  } catch (err) {
    console.log(`DB ERROR: ${err}`);
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
    console.log(`DB ERROR: ${err}`);
  }
};

exports.putOne = async (req, res) => {
  try {
    const product = req.body;

    const editProduct = await Product.findOneAndUpdate(
      { _id: product.id },
      {
        type: product.type,
        code: product.code,
        name: product.name,
        photoURL: product.photoURL,
        stock: product.stock,
        psv: product.psv,
        dimensions: {
          height: product.dimensions.height,
          length: product.dimensions.length,
          width: product.dimensions.width,
        },
        weight: product.weight,
      },
      (err) => {
        if (err) {
          console.log(`MONGO ERROR: ${err}`);
        }
      }
    );

    console.log(editProduct);
  } catch {
    console.log(`DB ERROR: ${err}`);
  }
};
