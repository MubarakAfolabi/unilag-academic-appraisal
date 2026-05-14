const passport = require("../configs/passport.js");

const auth = passport.authenticate("jwt", { session: false });

module.exports = auth;
