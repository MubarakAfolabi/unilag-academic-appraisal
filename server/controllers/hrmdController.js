const queries = require("../prisma/queries.js");

const unassignedPublicationsGet = async (req, res) => {
  try {
    const unAssignedPublications = await queries.getUnassignedPublications();
    return res.status(200).json({ success: true, unAssignedPublications });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  unassignedPublicationsGet,
};
