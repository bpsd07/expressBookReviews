const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const general_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use(session({
  secret: "fingerprint_customer",
  resave: true,
  saveUninitialized: true
}));

// AUTH MIDDLEWARE
app.use("/customer/auth/*", function auth(req, res, next) {
  if (req.session.authorization) {
    let token = req.session.authorization['accessToken'];
    jwt.verify(token, "fingerprint_customer", (err, user) => {
      if (!err) {
        req.user = user;
        next();
      } else {
        return res.status(403).json({ message: "User not authenticated" });
      }
    });
  } else {
    return res.status(403).json({ message: "User not logged in" });
  }
});

app.use("/customer", customer_routes);
app.use("/", general_routes);

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
