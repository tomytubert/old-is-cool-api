const Brand = require("../model/brand.model");

exports.getAllBrands = async (req, res) => {
  try {
    const allBrands = await Brand.find({});
    return res.status(200).json(allBrands);
  } catch (e) {
    return res.status(400).json({ message: "wrong request" });
  }
};
