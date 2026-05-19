require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("./configs/passport.js");
const auth = require("./middleware/auth.js");
const authRouter = require("./routers/authRouter.js");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use("/api", authRouter);

app.get("/api/profile", auth, (req, res) => {
  return res.json({ user: req.user });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`server listening on port ${PORT}`);
});
