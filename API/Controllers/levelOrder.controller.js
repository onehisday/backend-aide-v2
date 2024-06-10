const levelOrderModel = require("../../Models/levelOrder.model");

const levelOrderController = {
    createLevelOrder: async (req, res) => {
        try {
            const maxLevelOrder = await levelOrderModel
                .findOne()
                .sort({ level: -1 });
            const newLevel = maxLevelOrder ? maxLevelOrder.level + 1 : 1;
            const saveNewLevelOrder = await new levelOrderModel({
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
    updateLevelOrder: async (req, res) => {
        try {
            const update = await levelOrderModel.findOneAndUpdate(
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
    getAllLevelOrder: async (req, res) => {
        try {
            const findAll = await levelOrderModel
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
            const findById = await levelOrderModel
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
    checkLevelOrder: async (id, total, level) => {
        // const maxLevel = await levelOrderModel.findOne().sort({ level: -1 });
        // if (maxLevel && maxLevel.isLevel === false) {
        //     console.log("-------------------------");
        //     return false;
        // }

        const levels = await levelOrderModel.findOne({ level: level });
        console.log("levels:", levels);
        if (total < levels.amount) {
            return false;
        }
        levels.count += 1;
        levels.user.push(id);
        if (levels.count === levels.slotLevel) {
            levels.isLevel = false;
        }
        await level.save();
        return true;
        // for (const level of levels) {
        //     console.log("level:", level.amount);
        //     if (level.isLevel === true) {
        //         if (total < level.amount || level.user.includes(id)) {
        //             console.log(false);
        //             return false;
        //         }
        //         level.count += 1;
        //         level.user.push(id);
        //         if (Number(level.count) === level.slotLevel) {
        //             level.isLevel = false;
        //         }
        //         await level.save();
        //         return true;
        //     }
        // }
    },
    deleteLevelOrder: async (req, res) => {
        try {
            await levelOrderModel.findByIdAndDelete(req.params._id);
            return res.status(200).json({
                success: true,
                message: "Delete level order successfully.",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
};
module.exports = levelOrderController;
