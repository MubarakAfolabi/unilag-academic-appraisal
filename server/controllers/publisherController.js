const queries = require("../prisma/queries.js");

const submissionOverviewGet = async (req, res) => {
  const id = req.user.id;

  try {
    const submissionOverviewCount =
      await queries.publisherSubmissionOverview(id);

    return res.status(200).json({ success: true, submissionOverviewCount });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

const recentSubmissionsGet = async (req, res) => {
  const id = req.user.id;

  try {
    const recentSubmissions = await queries.publisherRecentSubmissions(id);
    return res.status(200).json({ success: true, recentSubmissions });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = { submissionOverviewGet, recentSubmissionsGet };
