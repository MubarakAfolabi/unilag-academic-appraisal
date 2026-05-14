const prisma = require("./prisma.js");

const findUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

const createUser = async (firstname, lastname, email, password, role) => {
  const user = prisma.user.create({
    data: {
      firstname,
      lastname,
      email,
      password,
      role,
    },
  });
  return user;
};

module.exports = { findUserById, createUser };
