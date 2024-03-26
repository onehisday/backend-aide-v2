const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png"],
  params: {
    folder: "ImageTON",
  },
});

const uploadCloud = multer({ storage });

const uploadMiddlewareFavicon = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/favicon"); // Thư mục lưu trữ favicon
    },
    filename: function (req, file, cb) {
      cb(null, "favicon" + path.extname(file.originalname)); // Đặt tên file favicon
    },
  }),
});

// Middleware multer cho logo
const uploadMiddlewareLogo = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/logo"); // Thư mục lưu trữ logo
    },
    filename: function (req, file, cb) {
      cb(null, "logo" + path.extname(file.originalname)); // Đặt tên file logo
    },
  }),
});

module.exports = { uploadCloud, uploadMiddlewareFavicon, uploadMiddlewareLogo };
