const userModel = require("../../Models/user.model");
const hrefController = {
  createHref: async (address) => {
    const domain = process.env.domain;
    return `https://${domain}?ref=${address}`;
  },
  findAddress: async (req, res, next) => {
    try {
      const find = req.params._id;
      const findAddress = await hrefModel
        .findOne({ addressGrand: find })
        .populate({
          path: "addressGrand",
        });
      return res.status(200).json({
        data: findAddress,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  rewardRefGrand: async (req, res, next) => {
    try {
      const addressGrand = req.params._id;
      const findIdGrand = await userModel.findOne({ address: addressGrand });
      const findGrand = await hrefModel.find({ addressGrand: findIdGrand._id });
      //console.log("findGrand:", findGrand);
      const totalChildByGrand = findGrand.length;
      //console.log(totalChildByGrand);
      const mapChild = await Promise.all(
        findGrand.map(async (a) => {
          const findChild = await orderModel.find({ address: a.addressChild });
          //console.log("findChild:", findChild);
          const totalQuantity = findChild.reduce((total, order) => {
            // console.log("quantity:", order.quantity);
            return total + order.quantity;
          }, 0);
          //console.log("total:", totalQuantity);

          return totalQuantity;
        })
      );
      const reduceTotal = mapChild.reduce(
        (total, quantity) => total + quantity,
        0
      );
      const findRose = await roseModel.findOne({ status: null });

      const totalRose = reduceTotal * findRose.price * findRose.percent;
      console.log("totalRose:", totalRose);
      return res.status(200).json({
        sucess: true,
        reward: totalRose,
        data: totalChildByGrand,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  getAllGrandChild: async (req, res, next) => {
    try {
      const findGrandChild = await hrefModel
        .find()
        .populate({ path: "addressGrand" });
      return res.status(200).json({
        sucess: true,
        data: findGrandChild,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  saveHref: async (req, res, next) => {
    try {
      const addressGrand = req.body.referralCode;
      console.log("addressGrand:", addressGrand);
      const addressChild = req.body.walletAddress;
      console.log("addressChild:", addressChild);
      const grandUser = await userModel.findOne({ address: addressGrand });
      if (!grandUser) {
        return res.status(404).json({
          sucess: false,
          message: "Address not found!",
        });
      }
      const newGrandChild = new hrefModel({
        addressChild: addressChild,
        addressGrand: grandUser._id,
      });
      console.log("newGrandChild:", newGrandChild);
      const saveNewGrandChild = await newGrandChild.save();
      console.log("savenewGrandChild:", saveNewGrandChild);
      return res.status(200).json({
        sucess: true,
        data: saveNewGrandChild,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
};
module.exports = hrefController;
