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
  originalName,
  filePath,
  fileName,
  fileSize,
  mimeType,
) => {
  return prisma.$transaction(async (tx) => {
    const publication = await tx.publication.create({
      data: {
        userId,
        fullCitation,
        publicationType,
        quartileRanking,
        nonIndexed,
        classification,
        originalName,
        filePath,
        fileName,
        fileSize,
        mimeType,
      },
    });

    const accessors = await tx.user.findMany({
      where: {
        role: "ACCESSOR",
      },
      select: {
        id: true,
      },
    });

    await tx.review.createMany({
      data: accessors.map((accessor) => ({
        reviewerId: accessor.id,
        publicationId: publication.id,
      })),
    });

    return publication;
  });
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

const accessorDashboardOverview = async (userId) => {
  const counts = await prisma.review.groupBy({
    by: ["status"],
    where: {
      reviewerId: userId,
    },
    _count: true,
  });
  return counts;
};

const accessorPendingReviews = async (userId) => {
  const pendingReviews = await prisma.review.findMany({
    where: {
      status: "PENDING",
      reviewerId: userId,
    },
    select: {
      publication: {
        select: {
          fullCitation: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
            },
          },
        },
      },
    },
  });
  return pendingReviews;
};

const accessorRecentActivities = async (userId) => {
  const recentActivities = await prisma.review.findMany({
    where: {
      status: {
        in: ["IN_PROGRESS", "COMPLETED"],
      },
      reviewerId: userId,
    },
    select: {
      status: true,
      openedAt: true,
      completedAt: true,
      publication: {
        select: {
          id: true,
          fullCitation: true,
        },
      },
    },
    orderBy: {
      assignedAt: "desc",
    },
    take: 5,
  });
  return recentActivities;
};

const accessorReviews = async (userId) => {
  const allReviews = await prisma.review.findMany({
    where: {
      reviewerId: userId,
    },
    select: {
      id: true,
      status: true,
      assignedAt: true,
      openedAt: true,
      completedAt: true,
      publication: {
        select: {
          id: true,
          fullCitation: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
            },
          },
        },
      },
    },
  });
  return allReviews;
};

const getReview = async (reviewId) => {
  const review = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
    select: {
      id: true,
      status: true,
      score: true,
      publication: {
        include: {
          user: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
            },
          },
        },
      },
    },
  });
  return review;
};

const updateReviewStatus = async (reviewId, status) => {
  const review = await prisma.review.update({
    where: {
      id: reviewId,
    },
    data: {
      status,
    },
  });
  return review;
};

const getPublication = async (publicationId) => {
  const publication = await prisma.publication.findUnique({
    where: {
      id: publicationId,
    },
    include: {
      user: {
        select: {
          id: true,
          firstname: true,
          lastname: true,
        },
      },
    },
  });
  return publication;
};

const updateReviewScore = async (reviewId, score) => {
  const review = await prisma.review.update({
    where: {
      id: reviewId,
    },
    data: {
      score,
      status: "COMPLETED",
      completedAt: new Date(),
    },
  });
  return review;
};

const getUsers = async (role, limit, offset) => {
  const users = await prisma.user.findMany({
    where: role ? { role } : undefined,
    ...(limit && { take: Number(limit) }),
    ...(offset && { skip: Number(offset) }),

    select: {
      id: true,
      firstname: true,
      lastname: true,
      role: true,
      reviews: {
        where: {
          completedAt: {
            not: null,
          },
        },
        orderBy: {
          completedAt: "desc",
        },
        take: 1,
        select: {
          completedAt: true,
        },
      },
    },
  });

  return users;
};

const getUser = async (userId) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      role: true,
    },
  });
};

const getAccessorReviewOverview = async (userId) => {
  const [totalReviews, completedReviews, recentReview] =
    await prisma.$transaction([
      prisma.review.count({
        where: {
          reviewerId: userId,
        },
      }),

      prisma.review.count({
        where: {
          reviewerId: userId,
          status: "COMPLETED",
        },
      }),

      prisma.review.findFirst({
        where: {
          reviewerId: userId,
          status: "COMPLETED",
          completedAt: {
            not: null,
          },
        },
        orderBy: {
          completedAt: "desc",
        },
        select: {
          completedAt: true,
        },
      }),
    ]);

  return { totalReviews, completedReviews, recentReview };
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
  accessorDashboardOverview,
  accessorPendingReviews,
  accessorRecentActivities,
  accessorReviews,
  getReview,
  updateReviewStatus,
  getPublication,
  updateReviewScore,
  getUsers,
  getUser,
  getAccessorReviewOverview,
};
