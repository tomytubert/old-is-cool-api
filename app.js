require("dotenv").config();
const express = require("express");
const app = express();

require("./config/db.config")();
require("./config/middleware.config")(app);
require("./config/session.config")(app);

const authRoutes = require("./routes/auth.routes");
const advertRoutes = require("./routes/advert.routes");
app.use("/auth", authRoutes);
app.use("/advert", advertRoutes);

app.listen(process.env.PORT, () =>
  console.log("server running", process.env.PORT)
);
