const queries = require("../prisma/queries.js");
const { body, validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcrypt");

const validateUser = [
  body("firstname")
    .trim()
    .isAlpha()
    .withMessage("First name must only contain letters")
    .isLength({ min: 4, max: 12 })
    .withMessage("First name must be between 4 and 12 characters"),

  body("lastname")
    .trim()
    .isAlpha()
    .withMessage("Last name must only contain letters")
    .isLength({ min: 4, max: 12 })
    .withMessage("Last name must be between 4 and 12 characters"),

  body("bio")
    .optional()
    .trim()
    .isLength({ max: 160 })
    .withMessage("Bio cannot exceed 160 characters"),

  body("password").custom((value, { req }) => {
    const changingPassword =
      req.body.password || req.body.newPassword || req.body.confirmNewPassword;

    if (!changingPassword) return true;

    if (!value) {
      throw new Error("Current password is required");
    }

    return true;
  }),

  body("newPassword").custom((value, { req }) => {
    const changingPassword =
      req.body.password || req.body.newPassword || req.body.confirmNewPassword;

    if (!changingPassword) return true;

    if (!value) {
      throw new Error("New password is required");
    }

    if (value.length < 6) {
      throw new Error("New password must be at least 6 characters");
    }

    return true;
  }),

  body("confirmNewPassword").custom((value, { req }) => {
    const changingPassword =
      req.body.password || req.body.newPassword || req.body.confirmNewPassword;

    if (!changingPassword) return true;

    if (!value) {
      throw new Error("Confirm password is required");
    }

    if (value !== req.body.newPassword) {
      throw new Error("Passwords do not match");
    }

    return true;
  }),
];

const updateUser = [
  validateUser,
  async (req, res) => {
    const id = req.user.id;

    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ success: false, errMessages: errors.array() });
      }

      const { firstname, lastname, bio, password, newPassword } =
        matchedData(req);

      let hashedPassword;
      if (newPassword) {
        const isMatch = await bcrypt.compare(password, req.user.password);

        if (!isMatch) {
          return res.status(400).json({
            success: false,
            errMessages: [
              { path: "password", msg: "Current Password is Incorrect" },
            ],
          });
        }

        hashedPassword = await bcrypt.hash(newPassword, 10);
      }

      const { phoneNo, department, faculty, rank } = req.body;

      const user = await queries.updateUserInfo(id, {
        firstname,
        lastname,
        phoneNo,
        department,
        faculty,
        rank,
        bio,
        ...(hashedPassword && { password: hashedPassword }),
      });
      return res
        .status(200)
        .json({ success: true, message: "Profile info updated successfully" });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  },
];

// const usersGet = async (req, res) => {
//   try {
//     const { role, limit } = req.query;
//   } catch (err) {
//     return res.status(400).json({ success: false, message: err.message });
//   }
// };

module.exports = { updateUser };
