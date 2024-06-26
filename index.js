const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const connect = require("./Config/index");
const moment = require("moment");
const PORT = process.env.PORT;

//const rewardController = require("./API/Controllers/reward.controller");
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
const refSystemRouter = require("./API/Routers/refSystem.router");
const withdrawRouter = require("./API/Routers/withdraw.router");
const claimRewardRouter = require("./API/Routers/claimReward.router");
const changeOrderRouter = require("./API/Routers/changeOrder.router");
// const rewardModel = require("./Models/reward.model");
// const detailOrderModel = require("./Models/detailOrder.model");
const userModel = require("./Models/user.model");
const changeOrderModel = require("./Models/changeOrder.model");
const transactionTonRouter = require("./API/Routers/transactionTon.router");

const regulationAgentRouter = require("./API/Routers/regulationAgent.router");
const secondBranchRouter = require("./API/Routers/secondBranch.router");
const agentRouter = require("./API/Routers/agent.router");
const commissionAgentRouter = require("./API/Routers/commissionAgent.router");
const levelOrderRouter = require("./API/Routers/levelOrder.router");
const levelRefRouter = require("./API/Routers/levelRef.router");

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
app.use(refSystemRouter);
app.use(withdrawRouter);
app.use(claimRewardRouter);
app.use(changeOrderRouter);
app.use(transactionTonRouter);

app.use(regulationAgentRouter);
app.use(secondBranchRouter);
app.use(agentRouter);
app.use(commissionAgentRouter);
app.use(levelOrderRouter);
app.use(levelRefRouter);

// const updateTotalEveryMin = async () => {
//     const _id = process.env._id;
//     const findReward = await rewardModel.findOne({ _id: _id });
//     //console.log("findReward:", findReward);
//     const findsDetailOrder = await detailOrderModel.updateMany(
//         { isStart: true },
//         { $inc: { reward: findReward.quantityCoin } },
//         { new: true }
//     );
//     console.log(findsDetailOrder);
// };
// const intervalTime = async () => {
//     const findReward = await rewardModel.findOne({ _id: process.env._id });
//     console.log(123);
//     if (findReward.status === false) {
//         return null;
//     } else {
//         return findReward.setTime;
//     }
// };
// const startInterval = async () => {
//     const setTime = await intervalTime();
//     if (setTime !== null) {
//         setInterval(() => {
//             updateTotalEveryMin();
//         }, setTime);
//     }
// };
//startInterval();
// const updateCountRewardByUser = async () => {
//     try {
//         const allUser = await userModel.find();
//         for (const user of allUser) {
//             const userAddress = user.address;
//             const totalReward =
//                 await rewardController.calculateTotalRewardByUser(userAddress);
//             user.totalReward = totalReward;
//             await user.save();
//         }
//         console.log("Total reward updated for all users successfully.");
//     } catch (error) {
//         console.error("Error updating total reward for users:", error);
//     }
// };

//setInterval(updateCountRewardByUser, process.env.settimeTotal);
async function update() {
    try {
        const users = await changeOrderModel.find();
        for (const user of users) {
            const rewardOrder = user.total * 0.01;
            user.reward = user.reward + rewardOrder;
            await user.save();
            const findUser = await userModel.findOne({ address: user.address });
            findUser.rewardOrder = findUser.rewardOrder + rewardOrder;
            await findUser.save();
        }

        console.log("Reward order update successfully!!!!!!!!!!!!!!!!");
    } catch (error) {
        console.error("Error updating total:", error);
    }
}
// setInterval(update, 30 * 24 * 60 * 60 * 1000);
// setInterval(update, 60 * 1000);
// update();
app.get("", (req, res) => {
    res.status(200).send({ message: "Welcome" });
});
app.listen(PORT, () => {
    console.log(`Server started on port ` + PORT);
});
