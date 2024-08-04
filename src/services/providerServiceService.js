const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createProviderService = async (providerId, data) => {
  return await prisma.providerService.create({
    data: {
      ...data,
      providerId,
    },
  });
};

exports.updateProviderService = async (providerId, serviceId, data) => {
  return await prisma.providerService.update({
    where: {
      id: serviceId,
      providerId,
    },
    data,
  });
};

exports.deleteProviderService = async (providerId, serviceId) => {
  return await prisma.providerService.delete({
    where: {
      id: serviceId,
      providerId,
    },
  });
};
