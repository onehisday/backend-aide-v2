const jwt = require("jsonwebtoken");
const userAdminModel = require("../Models/userAdmin.model");

const tokenMiddleware = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      const userAdmin = jwt.verify(
        accessToken,
        process.env.JWT_SECRET,
        (err, userAdmin) => {
          if (err) {
            res.status(403).json("Token is not valid!");
          }
          req.userAdmin = userAdmin;
          next();
        }
      );
    } else {
      res.status(401).json("You're not authenticated");
    }
  },
  verifyTokenAdmin: (req, res, next) => {
    const verifyToken = tokenMiddleware.verifyToken;
    verifyToken(req, res, () => {
      if (req.userAdmin.isAdmin) {
        next();
      } else {
        return res.status(403).json({
          message: "You are not allowed to do that!",
        });
      }
    });
  },
};
module.exports = tokenMiddleware;
