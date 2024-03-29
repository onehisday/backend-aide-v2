const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const connect = require("./Config/index");
const moment = require("moment");
const cloudinary = require("cloudinary");
//const multerStorageCloundinary = require("multer-storage-cloudinary");
const PORT = process.env.PORT;

const rewardController = require("./API/Controllers/reward.controller");
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
const orderRouter = require("./API/Routers/order.router");
const rewardRouter = require("./API/Routers/reward.router");
const claimRoseRouter = require("./API/Routers/claimRose.router");
const claimNodeRouter = require("./API/Routers/claimNode.router");
const hrefRouter = require("./API/Routers/href.router");
const historyClaimNodeRouter = require("./API/Routers/historyClaimNode.router");
const historyClaimCommissionRouter = require("./API/Routers/historyClaimCommission.router");
const transactionRouter = require("./API/Routers/transaction.router");
const commissionRouter = require("./API/Routers/commission.router");

const rewardModel = require("./Models/reward.model");
const detailOrderModel = require("./Models/detailOrder.model");
const orderModel = require("./Models/order.model");
const userModel = require("./Models/user.model");
app.use(siteRouter);
app.use(userAdminRouter);
app.use(userRouter);
app.use(tierRouter);
app.use(walletRouter);
app.use(promotionRouter);
app.use(settingRouter);
app.use(orderRouter);
app.use(rewardRouter);
app.use(claimRoseRouter);
app.use(claimNodeRouter);
app.use(hrefRouter);
app.use(historyClaimNodeRouter);
app.use(historyClaimCommissionRouter);
app.use(transactionRouter);
app.use(commissionRouter);

const updateTotalEveryMin = async () => {
  const _id = process.env._id;
  const findReward = await rewardModel.findOne({ _id: _id });
  //console.log("findReward:", findReward);
  const findsDetailOrder = await detailOrderModel.updateMany(
    { isStart: true },
    { $inc: { reward: findReward.quantityCoin } },
    { new: true }
  );
  console.log(findsDetailOrder);
};
const intervalTime = async () => {
  const findReward = await rewardModel.findOne({ _id: process.env._id });
  console.log(123);
  if (findReward.status === false) {
    return null;
  } else {
    return findReward.setTime;
  }
};
const startInterval = async () => {
  const setTime = await intervalTime();
  if (setTime !== null) {
    setInterval(() => {
      updateTotalEveryMin();
    }, setTime);
  }
};
startInterval();
// intervalTime().then((setTime) => {
//   if (setTime !== null) {
//     setInterval(updateTotalEveryMin, setTime);
//   }
// });
const updateCountRewardByUser = async () => {
  try {
    const allUser = await userModel.find();
    for (const user of allUser) {
      const userAddress = user.address;
      const totalReward = await rewardController.calculateTotalRewardByUser(
        userAddress
      );
      user.totalReward = totalReward;
      await user.save();
    }
    console.log("Total reward updated for all users successfully.");
  } catch (error) {
    console.error("Error updating total reward for users:", error);
  }
};

setInterval(updateCountRewardByUser, process.env.settimeTotal);
app.get("", (req, res) => {
  res.status(200).send({ message: "Welcome" });
});
app.listen(PORT, () => {
  console.log(`Server started on port ` + PORT);
});
