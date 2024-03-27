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
      console.log(123);
      console.log(req.files);
      const images = req.files;
      console.log("images:", images);
      const logoImage = images.logo[0];
      console.log("logoImage:", logoImage);
      const faviconImage = images.favicon[0];
      // Upload images to Firebase
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
    console.log("image:", image);
    const imageName = uuidv4();
    console.log("imageName:", imageName);
    const imageRef = ref(storage, `images/${imageName}`);
    console.log("imageRef:", imageRef);
    const metadata = {
      contentType: image.mimetype,
    };
    console.log("metadata:", metadata);
    // Read the image file from the path
    const imageData = fs.readFileSync(image.path);
    const snapshot = await uploadBytesResumable(imageRef, imageData, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  },
};
module.exports = settingController;
