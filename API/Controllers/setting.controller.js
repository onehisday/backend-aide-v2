//const cloudinary = require("cloudinary").v2;
const settingModel = require("../../Models/setting.model");
const { v4: uuidv4 } = require("uuid");
const {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");
const path = require("path");
const storage = require("../../Config/firebase");
const fs = require("fs");
//storage();
const settingController = {
  saveSetting: async (req, res, next) => {
    try {
      const images = req.files;
      console.log("images:", images);
      const logoImage = images.logo[0];
      const faviconImage = images.favicon[0];
      const logoUrl = await settingController.uploadImage(logoImage);
      console.log("logoUrl:", logoUrl);
      const faviconUrl = await settingController.uploadImage(faviconImage);
      const newSetting = new settingModel({
        title: req.body.title,
        descriptionSetting: req.body.descriptionSetting,
        favicon: logoUrl,
        logo: faviconUrl,
      });
      const saveSetting = await newSetting.save();
      return res.status(200).json({
        sucess: true,
        data: saveSetting,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  uploadImage: async (image) => {
    const imageName = uuidv4();
    const imageRef = ref(storage, `images/${imageName}`);
    const metadata = {
      contentType: image.mimetype,
    };
    const imageData = fs.readFileSync(image.path);
    const snapshot = await uploadBytesResumable(imageRef, imageData, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  },
  getAllSetting: async (req, res, next) => {
    try {
      const findAllSetting = await settingController.find();
      return res.status(200).json({
        sucess: true,
        data: findAllSetting,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  getIdSetting: async (req, res, next) => {
    try {
      const findIdSetting = await settingModel.findOne({ _id: req.params._id });
      if (!findIdSetting) {
        return res.status(404).json({
          sucess: false,
          message: "The id setting not found!",
        });
      }
      return res.status(200).json({
        sucess: true,
        data: findIdSetting,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  putSetting: async (req, res, next) => {
    try {
      const title = req.body.title;
      const descriptionSetting = req.body.descriptionSetting;
      const images = req.files;
      console.log(images);
      const logoImage = images.logo[0];
      console.log("logoImage:", logoImage);
      const faviconImage = images.favicon[0];
      console.log("favicon:", faviconImage);
      const logoUrl = await settingController.uploadImage(logoImage);
      const faviconUrl = await settingController.uploadImage(faviconImage);
      const conditionSetting = { _id: req.params._id };
      const updateSettingData = {
        title: title,
        descriptionSetting: descriptionSetting,
        favicon: faviconUrl,
        logo: logoUrl,
      };
      const updatedSetting = await settingModel.findOneAndUpdate(
        conditionSetting,
        updateSettingData,
        { new: true }
      );
      return res.status(200).json({
        sucess: true,
        data: updatedSetting,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
};
module.exports = settingController;
