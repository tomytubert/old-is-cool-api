const Advert = require("../model/advert.model");
const User = require("../model/user.model");
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
      typeOfTransmision,
      km,
      price,
      address
    } = req.body;
    const isMissingCredentials =
      !typeOfCar || !image || !brand || !year || !model;
    if (isMissingCredentials) {
      return res.status(400).json({ message: req.body });
    }
    const userSessionId = req.session.userId
    
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
      typeOfTransmision,
      km,
      price,
      address,
      user:req.session.userId
    });
    
    return res.status(200).json({ advert: newAdvert._id });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: "wrong request" });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      next(new Error("no file uploaded"));
      return;
    }
    res.json(req.file.path);
  } catch (e) {
    console.error(e);
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
    return res.status(200).json({ messege: "delete successfull", advertId });
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

exports.likedAdvert = async (req,res)=>{
  try{
    const { userId } = req.session;
    const advertId = Object.keys(req.body)
    const updateUserLikeAdvert = await User.findByIdAndUpdate( userId,
      {$addToSet: {likedAdverts: advertId[0]}},
      {new: true})
    return res.status(200).json(updateUserLikeAdvert)
  }catch(e){
    return res.status(400).json({message:"wrong request"})
  }
}
exports.unLikedAdvert = async (req,res)=>{
  try{
    const { userId } = req.session;
    const advertId = Object.keys(req.body)
    const updateUserLikeAdvert = await User.findByIdAndUpdate( userId,
      {$pull: {likedAdverts: advertId[0]}},
      {new: true})
    return res.status(200).json(updateUserLikeAdvert)
  }catch(e){
    return res.status(400).json({message:"wrong request"})
  }
}