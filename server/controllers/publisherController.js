const queries = require("../prisma/queries.js");

const submissionOverviewGet = async (req, res) => {
  const id = req.user.id;

  const submissionOverviewCount =
    await queries.getPublisherSubmissionOverview(id);

  return res.status(200).json({ success: true, submissionOverviewCount });

  try {
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = { submissionOverviewGet };
