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
      console.log("numberPromo:", numberCode);
      const percent = req.body?.percent;
      console.log("percent:", percent);
      const description = req.body?.description;
      console.log("description:", description);
      const startDate = moment(req.body.startDate, "YYYY-MM-DD HH:mm");
      console.log("startDate:", startDate);
      const endDate = moment(req.body.endDate, "YYYY-MM-DD HH:mm").toDate();
      console.log("endDate:", endDate);
      const arrayPromoCode = [];
      for (let i = 0; i < numberCode; i++) {
        const randomPromoCode = generatePromoCoupn(10);
        arrayPromoCode.push(randomPromoCode);
      }
      console.log(arrayPromoCode);

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
      const currentDate = moment();
      if (
        currentDate.isBetween(checkFindPromo.startDate, checkFindPromo.endDate)
      ) {
        return true;
      }
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  getAllPromotion: async (req, res, next) => {
    try {
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
};
module.exports = promotionController;
