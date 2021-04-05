const jwt = require("jsonwebtoken");
const User = require("../models/users");
module.exports = {
  // To create token
  createToken: (id, email) => {
    return jwt.sign({ id, email }, process.env.JWT_SECRET_KEY);
  },
  isLoggedIn: (req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization == undefined)
      return res.status(401).json({ status: false, message: "Authorization Required" });
    const token = req.headers.authorization.split(' ')[1];
    try {
      var user = token ? jwt.verify(token, process.env.JWT_SECRET_KEY) : false;
    } catch (err) {
      return res.status(401).json({ status: false, message: "User is not Authorized" });
    }
    if (user && user.id) {
      id = user.id;
      next();
    } else {
      return res.status(401).json({ status: false, message: "User is not Authorized" });
    }
  },
  isAdmin: (req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization == undefined)
      return res.status(401).json({ status: false, message: "Authorization Required" });
    const token = req.headers.authorization.split(' ')[1];
    try {
      var user = token ? jwt.verify(token, process.env.JWT_SECRET_KEY) : false;
    } catch (err) {
      return res.json({ status: false, message: "Access Denaid" });
    }
    if (user.role === 1) {
      console.log("Access Granted");
      next();
    } else {
      console.log("Access Denaid");
      return res.json({ status: false, message: "Access Denaid" });
    }
  },
};