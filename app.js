require("dotenv").config();
const express = require("express");
const app = express();

require("./config/db.config")();
require("./config/middleware.config")(app);
require("./config/session.config")(app);

const authRoutes = require("./routes/auth.routes");
const advertRoutes = require("./routes/advert.routes");
const brandRoutes = require("./routes/brand.routes")
app.use("/auth", authRoutes);
app.use("/advert", advertRoutes);
app.use("/brand", brandRoutes);

app.listen(process.env.PORT, () =>
  console.log("server running", process.env.PORT)
);
