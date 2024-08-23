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
  const { providerCategoryId } = data;
  await prisma.providerService.update({
    where: {
      id: serviceId,
      providerId,
    },
    data: {
      ...data
    },
  });
  const activeServices = await prisma.providerService.findMany({
    where: {
      providerId,
      providerCategoryId,
      isActive: true,
    },
  });
  if (activeServices.length === 0) {
    await prisma.providerCategory.update({
      where: {
        id: providerCategoryId,
        providerId,
      },
      data: {
        isActive: false,
      },
    });
  }
};

exports.deleteProviderService = async (providerId, serviceId) => {
  return await prisma.providerService.delete({
    where: {
      id: serviceId,
      providerId,
    },
  });
};
