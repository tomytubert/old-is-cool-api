const Advert = require("../model/advert.model");
const bcrypt = require("bcryptjs");

exports.createAdvert = async (req, res) => {
  try {
    const {
      typeOfCar,
      image,
      brand,
      year,
      fuel,
      model,
      horsePower,
      color,
      otherInformation,
    } = req.body;
    const isMissingCredentials =
      !typeOfCar || !image || !brand || !year || !model;
    if (isMissingCredentials) {
      return res.status(400).json({ message: "missing credentials" });
    }
    const newAdvert = await Advert.create({
      typeOfCar,
      image,
      brand,
      year,
      fuel,
      model,
      horsePower,
      color,
      otherInformation,
      user: req.session.userId,
    });
    return res.status(200).json({ advert: newAdvert._id });
  } catch (e) {
    return res.status(400).json({ message: "wrong request" });
  }
};

exports.getAllAdverts = async (req, res) => {
  try {
    const allAdverts = await Advert.find({});
    return res.status(200).json(allAdverts);
  } catch (e) {
    return res.status(400).json({ message: "wrong request" });
  }
};

exports.getAdvert = async (req, res) => {
  try {
    const { advertId } = req.params;
    const advert = await Advert.findById(advertId);
    return res.status(200).json(advert);
  } catch (e) {
    return res.status(400).json({ message: "wrong request" });
  }
};

exports.deleteAdvert = async (req, res) => {
  try {
    const { advertId } = req.params;
    const advert = await Advert.findByIdAndDelete(advertId);
    return res.status(200).json({messege: "delete successfull", advertId});
  } catch (e) {
    return res.status(400).json({ message: "wrong request" });
  }
};

exports.updateAdvert = async (req, res) => {
  try {
    const { advertId } = req.params;
    const advert = await Advert.findByIdAndUpdate(advertId, req.body);
    return res.status(200).json(advert);
  } catch (e) {
    return res.status(400).json({ message: "wrong request" });
  }
};
