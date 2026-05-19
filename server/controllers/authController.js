require("dotenv").config();
const queries = require("../prisma/queries.js");
const { body, validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validateUser = [
  body("firstname")
    .trim()
    .isAlpha()
    .withMessage("Username must only contain letters")
    .isLength({ min: 4, max: 12 })
    .withMessage("Username must be between 4 and 12 characters"),
  body("lastname")
    .trim()
    .isAlpha()
    .withMessage("Username must only contain letters")
    .isLength({ min: 4, max: 12 })
    .withMessage("Username must be between 4 and 12 characters"),
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
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

const registerUser = [
  validateUser,
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const firstError = errors.array();
        return res
          .status(400)
          .json({ success: false, message: firstError[0].msg });
      }

      const { firstname, lastname, email, password } = matchedData(req);
      const { role } = req.body;
      const existingUser = await queries.findUserByEmail(email);

      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(req.body);
      await queries.createUser(
        firstname,
        lastname,
        email,
        hashedPassword,
        role,
      );
      return res
        .status(200)
        .json({ success: true, message: "User created successfully" });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  },
];

const login = async (req, res) => {
  try {
    const { role } = req.params;

    const { email, password } = req.body;
    const user = await queries.findUserByEmail(email);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    console.log(user.role, role);

    if (user.role !== role) {
      return res.status(403).json({
        success: false,
        message: `This account is registered as a ${user.role.toLowerCase()}. Please use the ${user.role.toLowerCase()} login.`,
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.status(200).json({ success: true, token });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { registerUser, login };
