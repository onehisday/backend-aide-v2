// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// const uploadMultiple = multer({
//   storage: multer.memoryStorage(),
//   limits: { fieldSize: 1000000 },
//   fileFilter: function (req, file, cb) {
//     console.log(file);
//     checkFileType(file, cb);
//   },
// }).array("image", 12);

// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 1000000 },
//   fileFilter: async function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// }).single("image");

// const uploadTest = multer({ storage: multer.memoryStorage });
// function checkFileType(file, cb) {
//   const fileTypes = /jpeg|jpg|png/;
//   const extName = fileTypes.test(
//     path.extname(file.originalname).toLocaleLowerCase()
//   );
//   const mimeType = fileTypes.test(file.mimeType);
//   if (mimeType && extName) {
//     return cb(null, true);
//   } else {
//     cb("Error: Images Only!");
//   }
// }
// module.exports = { uploadMultiple, upload };
const { v4: uuidv4 } = require("uuid");
const {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");
const storage = require("../Config/firebase");
const fs = require("fs");

const uploadImageToFirebase = async (req, res, next) => {
  try {
    console.log(123);
    const images = req.files;
    console.log("images:", images);

    // Kiểm tra xem có ảnh logo và ảnh favicon trong yêu cầu không
    if (!images.logo || !images.favicon) {
      return res
        .status(400)
        .send({ error: "Both logo and favicon images are required" });
    }

    // Lấy ảnh logo và ảnh favicon từ yêu cầu
    const logoImage = images.logo[0];
    const faviconImage = images.favicon[0];

    // Upload ảnh logo và ảnh favicon lên Firebase Storage và lấy URL
    const logoUrl = await uploadImage(logoImage);
    const faviconUrl = await uploadImage(faviconImage);

    // Thêm các URL vào req để sử dụng trong controller
    req.logoUrl = logoUrl;
    req.faviconUrl = faviconUrl;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while uploading images" });
  }
};

const uploadImage = async (image) => {
  const imageName = uuidv4();
  const imageRef = ref(storage, `images/${imageName}`);
  const metadata = {
    contentType: image.mimetype,
  };

  // Đọc dữ liệu của ảnh từ file
  const imageData = fs.readFileSync(image.path);

  // Tải lên ảnh lên Firebase Storage
  const snapshot = await uploadBytesResumable(imageRef, imageData, metadata);

  // Lấy URL của ảnh từ Firebase Storage
  const downloadURL = await getDownloadURL(snapshot.ref);

  return downloadURL;
};

module.exports = uploadImageToFirebase;
