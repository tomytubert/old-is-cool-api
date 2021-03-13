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
  uploadImage
} = require("../controllers/advert.controllers");

route
  .post("/upload",fileUploader.single("image"),uploadImage)
  .post("/newAdvert", withAuth, createAdvert)
  .get("/getAll", getAllAdverts)
  .get("/:advertId", getAdvert)
  .delete("/:advertId/delete", withAuth, deleteAdvert)
  .post("/:advertId/edit", withAuth, updateAdvert);

module.exports = route;
