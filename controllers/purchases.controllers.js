const Advert = require("../model/advert.model");
const User = require("../model/user.model");
const Purchases = require("../model/purchases.model");
const bcrypt = require("bcryptjs");

exports.createPurchases = async (req, res) => {
  try {
    const buyer = Object.keys(req.body);
    const { userId } = req.session;

    const newPurchases = await Purchases.create({
      seller: userId,
      buyer: buyer,
    });

    return res.status(200).json({ newPurchases });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: "wrong request" });
  }
};

exports.updatePurchases = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId, "Id Purchases");
    const {opinion,rating} = req.body;
    const purchases = await Purchases.findByIdAndUpdate(
        // {buyer:userId},
        userId,
        {opinion:opinion,rating:rating},
        {new:true}
        )
    return res.status(200).json(purchases);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: "wrong request" });
  }
};
exports.getPurchases = async (req, res) => {
  try {
    const { userId } = req.params;
    const purchases = await Purchases.find({buyer:userId}).populate("seller","name email img")
    return res.status(200).json(purchases);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: "wrong request" });
  }
};

exports.getPurchasesSeller = async (req, res) => {
  try {
    const { userId } = req.params;
    const purchases = await Purchases.find({seller:userId}).populate("buyer","name email img")
    return res.status(200).json(purchases);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: "wrong request" });
  }
};

// exports.deleteAdvert = async (req, res) => {
//     try {
//       const { purchasesId } = req.params;
//       const purchases = await Advert.findByIdAndDelete(purchasesId);
//       return res.status(200).json({ messege: "delete successfull"});
//     } catch (e) {
//       return res.status(400).json({ message: "wrong request" });
//     }
//   };