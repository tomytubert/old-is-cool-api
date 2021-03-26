const { Router } = require("express");
const route = Router();
const {
  createPurchases,
  updatePurchases,
  getPurchases,
  getPurchasesSeller

} = require("../controllers/purchases.controllers");

route
.post("/",createPurchases)
.get("/:userId",getPurchases)
.get("/seller/:userId",getPurchasesSeller)
.post("/update/:userId",updatePurchases)



module.exports = route;