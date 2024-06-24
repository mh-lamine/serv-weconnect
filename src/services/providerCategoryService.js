const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createProviderCategory = async (data) => {
  return await prisma.providerCategory.create({ data });
};

exports.getProviderCategories = async (id) => {
  return await prisma.providerCategory.findMany({
    where: { id },
    include: { services: true },
  });
};

exports.updateProviderCategory = async (id, data) => {
  return await prisma.providerCategory.update({
    where: { id },
    data,
  });
}

exports.deleteProviderCategory = async (id) => {
  return await prisma.providerCategory.delete({
    where: { id },
  });
};