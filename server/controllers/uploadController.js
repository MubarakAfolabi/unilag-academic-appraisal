const fs = require("fs");
const path = require("path");
const queries = require("../prisma/queries.js");
const { body, validationResult, matchedData } = require("express-validator");

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const validatePublication = [
  body("publication")
    .trim()
    .notEmpty()
    .withMessage("Publication field is required"),

  body("publicationType")
    .trim()
    .notEmpty()
    .withMessage("Publication type is required")
    .isIn(["JOURNAL_ARTICLE", "CONFERENCE", "BOOK", "BOOK_CHAPTER"])
    .withMessage("Invalid publication type"),

  body("quartile")
    .trim()
    .notEmpty()
    .withMessage("Quartile ranking is required")
    .isIn(["Q1", "Q2", "Q3", "OTHERS"])
    .withMessage("Invalid quartile value"),

  body("nonIndexed").custom((value, { req }) => {
    const quartile = req.body.quartile || req.body.quartileRanking;

    const isNotIndexed = ["OTHERS"].includes(quartile);

    if (isNotIndexed) {
      if (
        !value ||
        !["UNIVERSITY_BASED", "NON_UNIVERSITY_BASED"].includes(value)
      ) {
        throw new Error(
          "Non Indexed is required and must be UNIVERSITY_BASED or NON_UNIVERSITY_BASED",
        );
      }
    } else {
      if (value && value.trim() !== "") {
        throw new Error(
          "Non Indexed must be empty when publication has quartile ranking (Q1-Q3)",
        );
      }
    }
    return true;
  }),

  body("classification")
    .trim()
    .notEmpty()
    .withMessage("Classification is required")
    .isIn(["NATIONAL", "INTERNATIONAL"])
    .withMessage("Invalid classification"),

  body("file").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("File upload is required");
    }

    const allowedExtensions = /\.(pdf|doc|docx)$/i;
    const allowedMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const extname = allowedExtensions.test(path.extname(req.file.originalname));
    const mimetype = allowedMimeTypes.includes(req.file.mimetype);

    if (!extname || !mimetype) {
      throw new Error("Only PDF, DOC, and DOCX files are allowed");
    }

    // if (req.file.size > 10 * 1024 * 1024) {
    //   throw new Error("File size must not exceed 10MB");
    // }

    return true;
  }),
];

const uploadFile = [
  validatePublication,
  async (req, res) => {
    const id = req.user.id;

    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ success: false, errMessages: errors.array() });
      }

      const {
        publication,
        publicationType,
        quartile,
        nonIndexed,
        classification,
      } = req.body;

      const cleanedNonIndexed =
        nonIndexed && nonIndexed.trim() !== "" ? nonIndexed : null;

      const uploadedFile = await queries.createPublication(
        id,
        publication,
        publicationType,
        quartile,
        cleanedNonIndexed,
        classification,
        `/uploads/${req.file.filename}`,
        req.file.fileName,
        req.file.size,
        req.file.mimetype,
      );

      return res.status(200).json({
        success: true,
        message: "Document uploaded successfully",
        uploadedFile,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
];

module.exports = {
  uploadFile,
};
