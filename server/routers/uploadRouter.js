const { Router } = require("express");
const uploadRouter = Router();
const uploadController = require("../controllers/uploadController.js");
const auth = require("../middleware/auth.js");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  // limits: { fileSize: 10 * 1024 * 1024 },
});

uploadRouter.post(
  "/upload",
  auth,
  upload.single("file"),
  uploadController.uploadFile,
);

module.exports = uploadRouter;
