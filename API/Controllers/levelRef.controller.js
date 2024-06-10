const levelRefModel = require("../../Models/levelRef.model");

const levelOrderController = {
    createLevelRef: async (req, res) => {
        try {
            const maxLevelOrder = await levelRefModel
                .findOne()
                .sort({ level: -1 });
            const newLevel = maxLevelOrder ? maxLevelOrder.level + 1 : 1;
            const saveNewLevelOrder = await new levelRefModel({
                level: newLevel,
                amount: req.body.amount,
                slotLevel: req.body.slotLevel,
            }).save();
            return res.status(200).json({
                success: true,
                data: saveNewLevelOrder,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    updateLevelRef: async (req, res) => {
        try {
            const update = await levelRefModel.findOneAndUpdate(
                { _id: req.params._id },
                {
                    amount: req.body.amount,
                    slotLevel: req.body.slotLevel,
                    status: req.body.status,
                },
                { new: true }
            );
            return res.status(200).json({
                success: true,
                data: update,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    getAllLevelRef: async (req, res) => {
        try {
            const findAll = await levelRefModel
                .find()
                .populate({ path: "user" });
            return res.status(200).json({
                success: true,
                data: findAll,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    getByIdLevelOrder: async (req, res) => {
        try {
            const findById = await levelRefModel
                .findById(req.params._id)
                .populate({ path: "user" });
            return res.status(200).json({
                success: true,
                data: findById,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    checkLevelOrder: async (id, total) => {
        const levels = await levelOrderModel.find().sort({ level: 1 });
        console.log("levels:", levels);
        for (const level of levels) {
            console.log("level:", level.amount);
            if (level.isLevel === true) {
                if (total < level.amount || level.user.includes(id)) {
                    console.log(false);
                    return false;
                }
                level.count += 1;
                level.user.push(id);
                if (Number(level.count) === level.slotLevel) {
                    level.isLevel = false;
                }
                await level.save();
                return true;
            }
        }
    },
};
module.exports = levelOrderController;
