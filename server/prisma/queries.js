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

const findUserByStaffId = async (staffId) => {
  const user = await prisma.user.findUnique({
    where: {
      staffId,
    },
  });
  return user;
};

const createUser = async (
  firstname,
  lastname,
  staffId,
  email,
  password,
  role,
) => {
  const user = await prisma.user.create({
    data: {
      firstname,
      lastname,
      staffId,
      email,
      password,
      role,
    },
  });
  return user;
};

module.exports = {
  findUserById,
  findUserByEmail,
  findUserByStaffId,
  createUser,
};
