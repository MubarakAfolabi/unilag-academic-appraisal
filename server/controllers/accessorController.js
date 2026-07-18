const queries = require("../prisma/queries.js");

const reviewOverviewGet = async (req, res) => {
  const id = req.user.id;

  try {
    const reviewOverview = await queries.accessorDashboardOverview(id);
    return res.status(200).json({ success: true, reviewOverview });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

const pendingReviewsGet = async (req, res) => {
  const id = req.user.id;

  try {
    const pendingReviews = await queries.accessorPendingReviews(id);
    return res.status(200).json({ success: true, pendingReviews });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

const recentActivitiesGet = async (req, res) => {
  const id = req.user.id;

  try {
    const recentActivities = await queries.accessorRecentActivities(id);
    return res.status(200).json({ success: true, recentActivities });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

const allReviewsGet = async (req, res) => {
  const id = req.user.id;

  try {
    const allReviews = await queries.accessorReviews(id);
    return res.status(200).json({ success: true, allReviews });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  reviewOverviewGet,
  pendingReviewsGet,
  recentActivitiesGet,
  allReviewsGet,
};
