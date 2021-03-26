const { Router } = require("express");
const route = Router();
const { withAuth } = require("../middlewares/withAuth");
const {
  login,
  signup,
  logout,
  getUser,
  update,
  sell,
  findUser
} = require("../controllers/auth.controllers");

route
  .post("/signup", signup)
  .post("/login", login)
  .post("/logout", logout)
  .post("/update",update)
  .post("/:advertId/sell",sell)
  .get("/", getUser)
  .get("/:userId",findUser)

module.exports = route;
