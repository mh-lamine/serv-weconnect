const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createProviderCategory = async (providerId, data) => {
  return await prisma.providerCategory.create({
    data: { ...data, providerId },
  });
};

exports.getProviderCategories = async (id) => {
  return await prisma.providerCategory.findMany({
    where: { providerId: id },
    include: { services: true },
  });
};

exports.getActiveCategories = async (id) => {
  return await prisma.providerCategory.findMany({
    where: { providerId: id, isActive: true },
    include: {
      services: {
        where: { isActive: true },
      },
    },
  });
};

exports.updateProviderCategory = async (providerId, categoryId, data) => {
  return await prisma.providerCategory.update({
    where: { id: categoryId, providerId },
    data,
  });
};

exports.deleteProviderCategory = async (providerId, categoryId) => {
  return await prisma.providerCategory.delete({
    where: { id: categoryId, providerId },
  });
};
