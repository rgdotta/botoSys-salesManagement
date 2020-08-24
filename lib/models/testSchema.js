const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema({
  title: String,
  content: String,
});

module.exports = Client = mongoose.model("Test", testSchema);
