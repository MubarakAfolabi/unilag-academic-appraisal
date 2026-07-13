const bcrypt = require("bcrypt");

bcrypt.hash("qwerty", 10).then(console.log);