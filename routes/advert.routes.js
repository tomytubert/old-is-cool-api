const { Router } = require("express");
const route = Router();
const { withAuth } = require("../middlewares/withAuth");
const {
  createAdvert,
  getAllAdverts,
  getAdvert,
  deleteAdvert,
  updateAdvert,
} = require("../controllers/advert.controllers");

route
  .post("/newAdvert", createAdvert)
  .get("/getAll", getAllAdverts)
  .get("/:advertId", getAdvert)
  .delete("/:advertId/delete", withAuth, deleteAdvert)
  .post("/:advertId/edit", withAuth, updateAdvert);

module.exports = route;
