const moment = require("moment");
const promotionModel = require("../../Models/promotion.model");
function generatePromoCoupn(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let promoCode = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    promoCode += characters[randomIndex];
  }
  return promoCode;
}
// function checkTimeOnePromo(promoCode){
//   const findPromoCode =
// }
const promotionController = {
  createCouponByAmount: async (req, res, next) => {
    try {
      const numberCode = req.body?.numberCode;
      //console.log("numberPromo:", numberCode);
      const percent = req.body?.percent;
      //console.log("percent:", percent);
      const description = req.body?.description;
      //console.log("description:", description);
      const startDate = moment(req.body.startDate, "YYYY-MM-DD HH:mm");
      //console.log("startDate:", startDate);
      const endDate = moment(req.body.endDate, "YYYY-MM-DD HH:mm").toDate();
      //console.log("endDate:", endDate);
      const arrayPromoCode = [];
      for (let i = 0; i < numberCode; i++) {
        const randomPromoCode = generatePromoCoupn(10);
        arrayPromoCode.push(randomPromoCode);
      }
      //console.log(arrayPromoCode);

      const savePromo = await Promise.all(
        arrayPromoCode.map(async (promo) => {
          const newPromoCode = new promotionModel({
            numberCode: numberCode,
            promoCode: promo,
            percent: percent,
            description: description,
            startDate: startDate,
            endDate: endDate,
          });
          return await newPromoCode.save();
        })
      );
      return res.status(200).json({
        sucess: true,
        data: savePromo,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  checkTimePromo: async (promoCode) => {
    try {
      const checkFindPromo = await promotionModel.findOne({ _id: promoCode });
      if (!checkFindPromo) {
        return res.status(404).json({
          sucess: false,
          message: "The promotion not found!",
        });
      }
      //console.log("checkFindPromo:", checkFindPromo);
      console.log(checkFindPromo.startDate);
      console.log(checkFindPromo.endDate);
      //const currentDate = moment();
      const currentDate = new Date();
      console.log("currentDate:", currentDate);
      // const momentCurrentDate = moment(currentDate);
      // console.log("momentCurrentDate:", momentCurrentDate);
      if (
        moment(currentDate).isBetween(
          moment(checkFindPromo.startDate),
          moment(checkFindPromo.endDate)
        )
      ) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  promotionHappen: async (req, res, next) => {
    try {
      const findPromo = await promotionModel.find();
      const validPromoCodes = [];
      const mapFindPromo = await Promise.all(
        findPromo.map(async (a) => {
          const checkPromo = await promotionController.checkTimePromo(a._id);
          //console.log("checkPromo:", checkPromo);
          if (checkPromo === true && a.isPromo === false) {
            validPromoCodes.push(a);
          }
        })
      );
      // const mapFindPromo = await Promise.all(
      //   findPromo.filter(async (promo) => {
      //     const checkPromo = await promotionController.checkTimePromo(
      //       promo._id
      //     );
      //     console.log(checkPromo);
      //     return checkPromo === true && promo.isPromo === false;
      //   })
      // );
      return res.status(200).json({
        sucess: true,
        data: validPromoCodes,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  getIdPromotion: async (req, res, next) => {
    try {
      const findByIdPromo = await promotionModel.findOne({
        _id: req.params._id,
      });
      return res.status(200).json({
        sucess: true,
        data: findByIdPromo,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  deleteOnePromo: async (req, res, next) => {
    try {
      const deletePromo = await promotionModel.findByIdAndDelete(
        req.params._id
      );
      if (deletePromo) {
        return res.status(200).json({
          sucess: true,
          message: "The Promotion is deleted!",
        });
      } else {
        return res.status(404).json({
          sucess: false,
          message: "The Promotion not found!",
        });
      }
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  deleteAllPromo: async (req, res, next) => {
    try {
      const findAllPromo = await promotionModel.deleteMany({});
      return res.status(200).json({
        sucess: true,
        message: "The data has been wiped clean.",
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  promotionCommingSoon: async (req, res, next) => {
    try {
      const findPromotion = await promotionModel.find();
      const currentDate = moment();
      console.log("currentDate:", currentDate);
      const checkPromotion = findPromotion.filter((pro) => {
        const start = moment(pro.startDate);
        return currentDate.isBefore(start);
      });
      if (checkPromotion.length == 0) {
        return res.status(200).json({
          sucess: true,
          message: "No promotion comming soon!",
        });
      }
      return res.status(200).json({
        sucess: true,
        data: checkPromotion,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  promotionFinished: async (req, res, next) => {
    try {
      const findPromotion = await promotionModel.find();
      const currentDate = moment();
      const checkProFinished = findPromotion.filter((pro) => {
        const endDate = moment(pro.endDate);
        return currentDate.isAfter(endDate);
      });
      return res.status(200).json({
        sucess: true,
        data: checkProFinished,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  updatePromoStatus: async (req, res, next) => {
    try {
      const findPromo = await promotionModel.findOne({
        _id: req.params._id,
      });
      if (!findPromo) {
        return res.status(404).json({
          sucess: false,
          message: "The Promo not found!",
        });
      }
      const conditionPromo = { _id: req.params._id };
      const updatedDataPromo = { isPromo: req.body.isPromo };
      const updatedPromo = await promotionModel.findOneAndUpdate(
        conditionPromo,
        updatedDataPromo,
        { new: true }
      );
      return res.status(200).json({
        message: "Updated promo successfully!",
        data: updatedPromo,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  getAllPromoIsTrue: async (req, res, next) => {
    try {
      const findPromo = await promotionModel.find({ isPromo: true });
      return res.status(200).json({
        sucess: true,
        data: findPromo,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
};
module.exports = promotionController;
