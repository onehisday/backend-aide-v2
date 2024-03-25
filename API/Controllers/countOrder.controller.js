const countOrderModel = require("../../Models/countOrder.model");

const countOrderController = {
  updateCountOrder: async (address, detailLength) => {
    const findAddress = await countOrderModel.findOne({ address: address });
    if (!findAddress) {
      const updateCount = await countOrderModel.create({
        address: address,
        totalNode: detailLength,
      });
      return { message: "Updated count order sucessfully!" };
    } else {
      findAddress.totalNode += detailLength;
      await findAddress.save();
      return { message: "Updated count order sucessfully!" };
    }
  },
};

module.exports = countOrderController;
