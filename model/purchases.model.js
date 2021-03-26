const mongoose = require("mongoose");

const PurchasesSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  //Añadir también el producto para facilitar más algunos procesos
  //Añadir también timeStamps
  rating: {
      type:Number
  },
  opinion:{
      type:String
  }
});

module.exports = mongoose.model("Purchases", PurchasesSchema);