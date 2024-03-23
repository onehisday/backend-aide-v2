const userModel = require("../../Models/user.model");
const hrefController = {
  createHref: async (address) => {
    const domain = process.env.domain;
    return `https://${domain}?ref=${address}`;
  },
};
module.exports = hrefController;
