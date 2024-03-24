const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const connect = require("./Config/index");
const moment = require("moment");
const cloudinary = require("cloudinary");
const multerStorageCloundinary = require("multer-storage-cloudinary");
const PORT = process.env.PORT;

const corsOption = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOption));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
connect();
const siteRouter = require("./API/Routers/site.router");
const userAdminRouter = require("./API/Routers/userAdmin.router");
const userRouter = require("./API/Routers/user.router");
const tierRouter = require("./API/Routers/tier.router");
const walletRouter = require("./API/Routers/wallet.router");
const promotionRouter = require("./API/Routers/promotion.router");
const settingRouter = require("./API/Routers/setting.router");
app.use(siteRouter);
app.use(userAdminRouter);
app.use(userRouter);
app.use(tierRouter);
app.use(walletRouter);
app.use(promotionRouter);
app.use(settingRouter);
app.get("", (req, res) => {
  res.status(200).send({ message: "Welcome" });
});
app.listen(PORT, () => {
  console.log(`Server started on port ` + PORT);
});
