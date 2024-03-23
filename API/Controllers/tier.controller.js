const tierModel = require("../../Models/tier.model");
const tierController = {
  createTier: async (req, res, next) => {
    try {
      const tier = req.body.tier;
      const ethCost = req.body.ethCost;
      const quantity = req.body.quantity;
      const fdv = req.body.fdv;
      const existingTier = await tierModel.findOne({
        tier: tier,
      });
      if (existingTier) {
        return res.status(409).json({
          sucess: false,
          message: "The tier is existing!",
        });
      }
      //console.log("tier", tier);
      const newTier = new tierModel({
        tier: tier,
        ethCost: ethCost,
        quantity: quantity,
        fdv: fdv,
      });
      const saveNewTier = await newTier.save();
      return res.status(200).json({
        sucess: true,
        data: saveNewTier,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  updateTier: async (req, res, next) => {
    try {
      const existingTier = await tierModel.findOne({ _id: req.params._id });
      if (!existingTier) {
        return res.status(404).json({
          sucess: false,
          message: "The tier not found!",
        });
      }
      const updatedDataTier = {
        tier: req.body.tier,
        ethCost: req.body.ethCost,
        quantity: req.body.quantity,
        fdv: req.body.fdv,
      };
      const conditionTier = {
        _id: req.params._id,
      };
      const updatedTier = await tierModel.findOneAndUpdate(
        conditionTier,
        updatedDataTier,
        { new: true }
      );
      return res.status(200).json({
        message: "Updated new tier sucessfully!",
        data: updatedTier,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  deleteTier: async (req, res, next) => {
    try {
      const deleteTier = await tierModel.findByIdAndDelete(req.params._id);
      if (deleteTier) {
        return res.status(200).json({
          sucess: true,
          message: "The tier is deleted!",
        });
      } else {
        return res.status(404).json({
          sucess: false,
          message: "The tier not found!",
        });
      }
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  getTierNext: async (req, res, next) => {
    try {
      const findTier = await tierModel.find().sort({ tier: 1 });
      console.log(findTier);
      for (let i = 0; i < findTier.length; i++) {
        const currentTier = findTier[i];
        const nextTier = findTier[i + 1];
        if (currentTier.count === currentTier.quantity) {
          //console.log(nextTier.count);
          return res.status(200).json({
            data: {
              tier: nextTier.tier,
              quantity: nextTier.quantity,
              ethCost: nextTier.ethCost,
            },
          });
        }
        if (currentTier.count < currentTier.quantity) {
          const remainingQuantityTier =
            currentTier.quantity - currentTier.count;
          //console.log(currentTier.quantity - currentTier.count);
          return res.status(200).json({
            data: {
              tier: currentTier.tier,
              quantity: remainingQuantityTier,
              ethCost: currentTier.ethCost,
            },
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  getOneTier: async (req, res, next) => {
    try {
      const idTier = req.params._id;
      const findOneTier = await tierModel.findOne({ _id: idTier });
      return res.status(200).json({
        sucess: true,
        data: findOneTier,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  getAllTier: async (req, res, next) => {
    try {
      const findTier = await tierModel.find();
      const mapTier = findTier.map((tier) => {
        const remaining = tier.quantity - tier.count;
        return { ...tier.toObject(), remaining };
      });

      return res.status(200).json({
        sucess: false,
        data: mapTier,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
};
module.exports = tierController;
