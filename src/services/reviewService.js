const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createReview = async (clientId, data) => {
  return await prisma.review.create({
    data: {
      ...data,
      clientId,
    },
  });
};

exports.getProviderReviews = async (serviceId) => {
  return await prisma.review.findMany({
    where: { serviceId },
  });
};

exports.updateReview = async (clientId, reviewId, data) => {
  return await prisma.review.update({
    where: {
      id: reviewId,
      clientId,
    },
    data,
  });
};

exports.deleteReview = async (clientId, reviewId) => {
  return await prisma.review.delete({
    where: {
      id: reviewId,
      clientId,
    },
  });
};
