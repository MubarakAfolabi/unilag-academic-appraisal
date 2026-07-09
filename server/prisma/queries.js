const { PublicationStatus } = require("@prisma/client");
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

const updateUserInfo = async (id, info) => {
  const user = await prisma.user.update({
    where: { id },
    data: info,
  });
  return user;
};

const createPublication = async (
  userId,
  fullCitation,
  publicationType,
  quartileRanking,
  nonIndexed,
  classification,
  filePath,
  fileName,
  fileSize,
  mimeType,
) => {
  const publication = await prisma.publication.create({
    data: {
      userId,
      fullCitation,
      publicationType,
      quartileRanking,
      nonIndexed,
      classification,
      filePath,
      fileName,
      fileSize,
      mimeType,
    },
  });
  return publication;
};

const publisherSubmissionOverview = async (userId) => {
  const [
    publicationCount,
    publicationUnderReviewCount,
    publicationScoredCount,
  ] = await Promise.all([
    await prisma.publication.count({
      where: {
        userId,
      },
    }),
    await prisma.publication.count({
      where: {
        userId,
        status: PublicationStatus.UNDER_REVIEW,
      },
    }),
    await prisma.publication.count({
      where: {
        userId,
        status: PublicationStatus.SCORED,
      },
    }),
  ]);

  return {
    publicationCount,
    publicationUnderReviewCount,
    publicationScoredCount,
  };
};

const publisherRecentSubmissions = async (userId) => {
  const recentPublications = await prisma.publication.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      fullCitation: true,
      status: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
  return recentPublications;
};

module.exports = {
  findUserById,
  findUserByEmail,
  findUserByStaffId,
  createUser,
  updateUserInfo,
  createPublication,
  publisherSubmissionOverview,
  publisherRecentSubmissions,
};
