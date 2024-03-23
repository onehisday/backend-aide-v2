const userAdminModel = require("../../Models/userAdmin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const siteController = {
  getAccessToken: (item) => {
    return jwt.sign(
      { userId: item._id, isAdmin: item.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "12d" }
    );
  },
  postLogin: async (req, res) => {
    try {
      const username = req.body.username;
      //console.log(username);
      const password = req.body.password;
      const existingUsername = await userAdminModel.findOne({
        username: username,
      });
      //console.log(existingUsername.username);
      if (!existingUsername) {
        return res.status(404).json({
          sucess: false,
          message: "Username not found!",
        });
      }
      const validPassword = await bcrypt.compare(
        password,
        existingUsername.password
      );
      if (!validPassword) {
        return res.status(404).json({
          sucess: false,
          message: "Wrong password!",
        });
      }
      const accessToken = siteController.getAccessToken(existingUsername);
      console.log("accessToken: ", accessToken);
      if (existingUsername && validPassword) {
        const { password, ...others } = existingUsername._doc;
        return res.status(200).json({
          message: "Logged in successfully.",
          user: { ...others, accessToken },
        });
      }
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
};
module.exports = siteController;
