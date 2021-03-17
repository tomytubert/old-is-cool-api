const { Router } = require("express");
const route = Router();
const { withAuth } = require("../middlewares/withAuth");
const {
  login,
  signup,
  logout,
  getUser,
} = require("../controllers/auth.controllers");

route
  .post("/signup", signup)
  .post("/login", login)
  .post("/logout", logout)
  .get("/", getUser);

module.exports = route;
