const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getPro = async (id) => {
  return await prisma.pro.findUnique({
    where: { id },
    include: {
      providerCategories: true,
      availabilities: true,
    },
  });
};

exports.updatePro = async (id, data) => {
  return await prisma.pro.update({
    where: { id },
    data,
  });
};
