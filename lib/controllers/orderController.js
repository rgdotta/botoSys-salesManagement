const Order = require("../models/orderSchema");

exports.findAll = async (req, res) => {
  try {
    const order = await Order.find({}, (err) => {
      if (err) {
        console.log(`MONGO ERROR: ${err}`);
      }
    });

    const response = res.json(order);

    console.log(response);
  } catch (err) {
    console.log(`DB ERROR: ${err}`);
  }
};

exports.createOne = async (req, res) => {
  try {
    const order = req.body;

    const newOrder = new Order({
      orderNum: order.orderNum,
      client: order.client,
      created_at: order.date,
      products: order.products,
      aditionalPrice: order.aditionalPrice,
      ledColor: order.ledColor,
      finishingColor: order.finishingColor,
      seatFabric: order.seatFabric,
      seam: order.seam,
      observation: order.observation,
      totalWeight: order.totalWeight,
      totalValue: order.totalValue,
      discount: order.discount,
      finalValue: order.finalValue,
    });

    const saveOrder = await newOrder.save();

    console.log(saveOrder);
  } catch (err) {
    console.log(`DB ERROR: ${err}`);
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const { id } = req.body;

    const order = await Order.findByIdAndDelete({ _id: id }, (err) => {
      if (err) {
        console.log(`MONGO ERROR: ${err}`);
      }
    });

    console.log(order);
  } catch (err) {
    console.log(`DB ERROR: ${err}`);
  }
};

exports.putOne = async (req, res) => {
  try {
    const order = req.body;

    const editOrder = await Order.findOneAndUpdate({ _id: id }, {}, (err) => {
      if (err) {
        console.log(`MONGO ERROR: ${err}`);
      }
    });

    console.log(editOrder);
  } catch {
    console.log(`DB ERROR: ${err}`);
  }
};

exports.findLast = async (req, res) => {
  try {
    const order = await Order.find()
      .sort({ _id: -1 })
      .limit(1)
      .select("orderNum");

    const response = res.json(order);

    console.log(response);
  } catch {
    console.log(`DB ERROR: ${err}`);
  }
};
