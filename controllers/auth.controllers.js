const User = require("../model/user.model");
const Advert = require("../model/advert.model");
const bcrypt = require("bcryptjs");
const {
  hasCorrectPasswordFormat,
  isMongoError,
  isMongooseErrorValidation,
} = require("../utils/validators.utils");

exports.signup = async (req, res) => {
  try {
    const { password, email, type, img } = req.body;
    console.log("req.body", type);
    const hasMissingCredentials = !password || !email;
    if (hasMissingCredentials) {
      return res.status(400).json({ message: "missing credentials" });
    }

    if (!hasCorrectPasswordFormat(password)) {
      return res.status(400).json({ message: "incorrect password format" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "user alredy exists" });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      email,
      hashedPassword,
      type,
      img,
    });

    req.session.userId = newUser._id;

    return res
      .status(200)
      .json({ user: newUser.email, id: newUser._id, type: type });
  } catch (e) {
    if (isMongooseErrorValidation(e)) {
      return res.status(400).json({ message: "incorrect email format" });
    }
    if (isMongoError(e)) {
      return res.status(400).json({ message: "duplicate field" });
    }
    return res.status(400).json({ message: "wrong request" });
  }
};

exports.login = async (req, res) => {
  try {
    const { password, email } = req.body;
    const hasMissingCredentials = !password || !email;
    if (hasMissingCredentials) {
      return res.status(400).json({ message: "missing credentials" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user does not exist" });
    }

    const hasCorrectPassword = await bcrypt.compare(
      password,
      user.hashedPassword
    );
    if (!hasCorrectPassword) {
      return res.status(401).json({ message: "unauthorize" });
    }
    if (!hasCorrectPasswordFormat(password)) {
      return res.status(400).json({ message: "incorrect password format" });
    }
    req.session.userId = user._id;

    return res.status(200).json({ user: user.email, id: user._id });
  } catch (e) {
    if (isMongooseErrorValidation(e)) {
      return res.status(400).json({ message: "incorrect email format" });
    }
    return res.status(400).json({ message: "wrong request" });
  }
};

exports.logout = async (req, res) => {
  await req.session.destroy();
  res.status(200).json({ message: "logout" });
};

exports.getUser = async (req, res) => {
  try {
    const { userId } = req.session;
    const {
      email,
      _id,
      likedAdverts,
      type,
      img,
      adverts,
      name,
      address,
      sells
    } = await User.findById(userId).populate({
      path: "adverts",
      populate:{
        path:"contacts",
        select:"email img"
      }
    })
    res.status(200).json({ id: _id, email, likedAdverts, type, img, adverts,name,address,sells });
  } catch (e) {
    return res.status(400).json({ message: userId });
  }
};
exports.findUser = async (req, res) => {
  try {
    const {userId} = req.params
    const {
      email,
      _id,
      likedAdverts,
      type,
      img,
      adverts,
      name,
      address,
      sells,
      rating
    } = await User.findById(userId).populate({
      path: "adverts",
      populate:{
        path:"contacts",
        select:"email"
      }
    });
    res.status(200).json({ id: _id, email, likedAdverts, type, img, adverts,name,address,sells,rating });
  } catch (e) {
    return res.status(400).json({ message: e });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, address, email, img } = req.body;
    const userUpdate = await User.findByIdAndUpdate(
      req.session.userId,
      { name: name, address: address, email: email, img: img },
      { new: true }
    );
    return res.status(200).json({ name: name, address: address, email: email, img:img });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: "wrong request" });
  }
};
exports.updateRating = async (req, res) => {
  try {
    const {userId} = req.params
    let rating = Object.keys(req.body);
    console.log(userId,rating[0]);
    const user = await User.findById(userId)
    let averageRating = 0;
    if(user.rating > 0 ){
      averageRating = (user.rating + Number(rating[0]))/2
    } else {
      averageRating = Number(rating[0])
    }
    
    
    const userUpdate = await User.findByIdAndUpdate(
      userId,
      { rating: averageRating },
      { new: true }
    );
    return res.status(200).json(userUpdate);
  } catch (e) {
    console.error(e);
    return res.status(400).json( rating )
  }
};

exports.sell = async (req, res) => {
  try {
    const { advertId } = req.params;
    const advertUpdate = await Advert.findByIdAndUpdate(
      advertId,
      {soldOut:true},
      {new:true}
    )
    const userUpdate = await User.findByIdAndUpdate(
      req.session.userId,
      {$addToSet:{sells: advertId}},
      { new: true }
    );
    return res.status(200).json(userUpdate);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: "wrong request" });
  }
};



