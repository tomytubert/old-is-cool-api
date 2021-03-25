const { Router } = require("express");
const route = Router();
const fileUploader = require("../config/cloudinary.config");
const { withAuth } = require("../middlewares/withAuth");
const {
  createAdvert,
  getAllAdverts,
  getAdvert,
  deleteAdvert,
  updateAdvert,
  uploadImage,
  likedAdvert,
  unLikedAdvert,
  findAdverts,
  contactAdvert
} = require("../controllers/advert.controllers");

route
  .post("/upload",fileUploader.single("image"),uploadImage)
  .post("/newAdvert", createAdvert)
  .post("/likedAdvert",likedAdvert)
  .post("/unLikedAdvert",unLikedAdvert)
  .get("/findAdverts?:query",findAdverts)
  .get("/getAll", getAllAdverts)
  .get("/:advertId", getAdvert)
  .delete("/:advertId/delete", withAuth, deleteAdvert)
  .post("/contact",contactAdvert)
  .post("/edit", updateAdvert);

module.exports = route;
