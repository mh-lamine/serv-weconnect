const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createProviderService = async (data) => {
  return await prisma.providerService.create({ data });
};

exports.updateProviderService = async (id, data) => {
  return await prisma.providerService.update({
    where: { id },
    data,
  });
};

exports.deleteProviderService = async (id) => {
  return await prisma.providerService.delete({
    where: { id },
  });
};