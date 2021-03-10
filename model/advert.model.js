const mongoose = require("mongoose");

const AdvertSchema = new mongoose.Schema({
  typeOfCar: {
    type: String,
    required: true,
    enum: ["coche", "furgoneta", "camion"],
  },
  image: {
    type: String,
    required: true,
  },
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  brand: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  fuel: {
    type: String,
    enum: ["gasolina", "diesel"],
  },
  model: {
    type: String,
    required: true,
  },
  horsePower: {
    type: Number,
  },
  color: {
    type: String,
  },
  otherInformation: {
    type: String,
  },
});

module.exports = mongoose.model("Advert", AdvertSchema);
