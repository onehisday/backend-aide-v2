const TonWeb = require("tonweb");
const tonweb = new TonWeb();

const tonTransactionController = {
    bocTon: async (req, res) => {
        try {
            const trans = req.body.trans;
            const bocCell = TonWeb.boc.Cell.oneFromBoc(
                TonWeb.utils.base64ToBytes(trans)
            );
            const hash = TonWeb.utils.bytesToBase64(await bocCell.hash());
            //res.send(hash);
            return res.status(200).json({
                success: true,
                data: hash,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
};
module.exports = tonTransactionController;
