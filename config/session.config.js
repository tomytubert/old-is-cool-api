// require("dotenv").config();
// const session = require("express-session");
// const MongoStore = require("connect-mongo").default;

// const { SESSION_SECRET, MONGODB_URI } = process.env;
// console.log(MONGODB_URI);
// module.exports = (app) => {
//   app.use(
//     session({
//       secret: SESSION_SECRET,
//       resave: true,
//       saveUninitialized: true,
//       cookie: { maxAge: 6000000 },
//       store: MongoStore.create({
//         mongoUrl: MONGODB_URI,
//         ttl: 60 * 60 * 24,
//       }),
//     })
//   );
// };
require("dotenv").config();
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const { SESSION_SECRET, MONGODB_URI, NODE_ENV } = process.env;
const isProduction = NODE_ENV === "production";
const sameSite = isProduction ? "none" : "lax";

module.exports = (app) => {
  app.set("trust proxy", 1);
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: { maxAge: 360000 * 24 * 14, secure: isProduction, sameSite },
      store: MongoStore.create({
        mongoUrl: MONGODB_URI,
        ttl: 360000 * 24 * 14,
      }),
    })
  );
};