const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  entity: String,
  name: String,
  companyName: String,
  document: Number,
  contact: {
    email: String,
    cellphone: Number,
    phone: Number,
    whatsapp: Number,
  },
  adress: {
    street: String,
    stNumber: Number,
    complement: String,
    zipcode: String,
    neighborhood: String,
    city: String,
    state: String,
  },
  birthday: Date,
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

module.exports = Client = mongoose.model("Client", clientSchema);
