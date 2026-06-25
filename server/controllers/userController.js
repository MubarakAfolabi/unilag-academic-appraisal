const queries = require("../prisma/queries.js");
const { body, validationResult, matchedData } = require("express-validator");

const validateUser = [
  body("firstname")
    .trim()
    .isAlpha()
    .withMessage("Firstname must only contain letters")
    .isLength({ min: 4, max: 12 })
    .withMessage("Firstname must be between 4 and 12 characters"),
  body("lastname")
    .trim()
    .isAlpha()
    .withMessage("Lastname must only contain letters")
    .isLength({ min: 4, max: 12 })
    .withMessage("Lastname must be between 4 and 12 characters"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters long"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password do not match");
    }
    return true;
  }),
];

const updateUser = [
  validateUser,
  async (req, res) => {
    const id = req.user.id;
    console.log(req.body);

    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const firstError = errors.array();
        return res
          .status(400)
          .json({ success: false, message: firstError[0].msg });
      }

      const { firstname, lastname } = matchedData(req);
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  },
];

module.exports = { updateUser };
