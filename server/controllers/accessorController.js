const { review } = require("../prisma/prisma.js");
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
    const reviews = await queries.accessorReviews(id);
    return res.status(200).json({ success: true, reviews });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

const reviewGet = async (req, res) => {
  const reviewId = parseInt(req.params.reviewId);

  try {
    const review = await queries.getReview(reviewId);
    return res.status(200).json({ success: true, review });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

const reviewStatusPatch = async (req, res) => {
  const reviewId = parseInt(req.params.reviewId);
  const { status } = req.body;

  try {
    const review = await queries.updateReviewStatus(reviewId, status);
    return res.status(200).json({ success: true, review });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  reviewOverviewGet,
  pendingReviewsGet,
  recentActivitiesGet,
  allReviewsGet,
  reviewGet,
  reviewStatusPatch,
};
