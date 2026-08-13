const { review } = require("../prisma/prisma.js");
const queries = require("../prisma/queries.js");
const { body, validationResult, matchedData } = require("express-validator");

const validateReviewScore = [
  body("score")
    .notEmpty()
    .withMessage("Score is required.")
    .isFloat({ min: 4.1, max: 5.0 })
    .withMessage("Score must be between 4.1 and 5.0."),
];

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
    let review = await queries.getReview(reviewId);

    if (review.status !== "COMPLETED") {
      review = await queries.updateReviewStatus(reviewId, status);
    }

    return res.status(200).json({ success: true, review });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

const reviewScorePatch = [
  validateReviewScore,
  async (req, res) => {
    const reviewId = parseInt(req.params.reviewId);

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ success: false, message: errors.array() });
      }

      let { score } = matchedData(req);
      score = parseFloat(score);

      const review = await queries.updateReviewScore(reviewId, score);
      return res.status(200).json({ success: true, review });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  },
];

const reviewCountGet = async (req, res) => {
  const userId = parseInt(req.query.userId);

  try {
    const reviewCount = await queries.getAccessorReviewOverview(userId);
    return res.status(200).json({ success: true, reviewCount });
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
  reviewScorePatch,
  reviewCountGet,
};
