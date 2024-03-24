const cloudinary = require("cloudinary").v2;
const settingModel = require("../../Models/setting.model");

const settingController = {
  saveSetting: async (req, res, next) => {
    try {
      console.log(req.file);
      const newSetting = new settingModel({
        title: req.body.title,
        descriptionSetting: req.body.descriptionSetting,
        favicon: req.file.path,
        logo: req.file.path,
      });
      const saveSetting = await newSetting.save();
      return res.status(200).json({
        sucess: true,
        data: saveSetting,
      });
    } catch (error) {
      if (req.file || req.files) {
        cloudinary.uploader.destroy(req.file.filename);
      }
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
};
module.exports = settingController;
