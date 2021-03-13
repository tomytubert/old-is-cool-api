const { Router } = require("express");
const route = Router();
const {
    getAllBrands,
} = require("../controllers/brand.controllers");

route
  .get("/getAll", getAllBrands)

module.exports = route;