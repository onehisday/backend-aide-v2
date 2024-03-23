const bcrypt = require("bcrypt");
const userAdminModel = require("../../Models/userAdmin.model");

const userAdminController = {
  createUserAdmin: async (req, res, next) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      const newUserAdmin = new userAdminModel({
        username: req.body.username,
        password: hashPassword,
      });

      const saveUser = await newUserAdmin.save();
      return res.status(200).json({
        sucess: true,
        data: saveUser,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  updateUserAdmin: async (req, res, next) => {
    try {
      const password = req.body.password;
      const username = req.body.username;
      const conditionUserAdmin = {
        _id: req.params._id,
      };
      const findUserAdmin = await userAdminModel.findOne({
        username: username,
      });
      if (!findUserAdmin) {
        return res.status(404).json({
          sucess: false,
          message: "Username not found!",
        });
      }
      const updateUserAdmin = {
        username: username,
      };
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        updateUserAdmin.password = hashPassword;
      }
      const saveUpdatedUserAdmin = await userAdminModel.findOneAndUpdate(
        conditionUserAdmin,
        updateUserAdmin,
        {
          new: true,
        }
      );
      return res.status(200).json({
        message: "Updated user admin sucessfully!",
        data: saveUpdatedUserAdmin,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  deleteUserAdmin: async (req, res, next) => {
    try {
      const deleteUserAdmin = await userAdminModel.findByIdAndUpdate(
        req.params._id
      );
      if (deleteUserAdmin) {
        return res.status(200).json({
          sucess: true,
          message: "The user admin is deleted!",
        });
      } else {
        return res.status(404).json({
          sucess: false,
          message: "The user admin not found!",
        });
      }
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  getByIdUser: async (req, res, next) => {
    try {
      const findUser = await userAdminModel.findOne({ _id: req.params._id });
      return res.status(200).json({
        sucess: true,
        data: findUser,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  getAllAdmin: async (req, res, next) => {
    try {
      const findAllAdmin = await userAdminModel.find();
      return res.status(200).json({
        sucess: true,
        data: findAllAdmin,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
};
module.exports = userAdminController;
