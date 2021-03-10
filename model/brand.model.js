const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
  logo: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Brand", BrandSchema);