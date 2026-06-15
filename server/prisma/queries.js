const prisma = require("./prisma.js");

const findUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

const findUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

const createUser = async (
  firstname,
  lastname,
  staffId,
  email,
  passwordHash,
  role,
) => {
  const user = await prisma.user.create({
    data: {
      firstname,
      lastname,
      staffId,
      email,
      passwordHash,
      role,
    },
  });
  return user;
};

module.exports = { findUserById, findUserByEmail, createUser };
