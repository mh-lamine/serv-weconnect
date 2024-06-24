const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createReview = async (data) => {
  return await prisma.review.create({ data });
};

exports.getProviderReviews = async (id) => {
  return await prisma.review.findMany({
    where: { providerId: id },
  });
};

exports.updateReview = async (id, data) => {
  return await prisma.review.update({ where: { id }, data });
};

exports.deleteReview = async (id) => {
  return await prisma.review.delete({ where: { id } });
};
