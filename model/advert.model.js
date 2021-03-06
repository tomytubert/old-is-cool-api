const mongoose = require("mongoose");

const AdvertSchema = new mongoose.Schema({
  typeOfCar: {
    type: String,
    required: true,
    enum: ["Coche", "Furgoneta", "Camion"],
  },
  image: {
    type: [String],
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
    enum: ["Gasolina", "Diesel"],
  },
  typeOfTransmision: {
    type: String,
    enum: ["Manual", "Automatico"],
  },
  km: {
    type: Number,
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
  price: {
    type: Number,
  },
  address: {
    type: String,
    required: true
  },
  fromWhere:{
    type: String,
    enum: ["Europa", "Asia","America"],
  },
  soldOut:{
    type:Boolean
  },
  contacts:[{
    type: mongoose.Schema.Types.ObjectId, ref:"User"
  }]
},{timestamps: true});

module.exports = mongoose.model("Advert", AdvertSchema);
