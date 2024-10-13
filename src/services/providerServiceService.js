const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createProviderService = async (id, role, data) => {
  const ref =
    role === "USER" ? "providerId" : role === "SALON" ? "salonId" : null;
  const body = {
    ...data,
    [ref]: id,
  };

  return await prisma.providerService.create({
    data: { ...body },
  });
};

exports.updateProviderService = async (providerId, serviceId, data) => {
  const { providerCategoryId } = data;
  await prisma.providerService.update({
    where: {
      id: serviceId,
      OR: [{ providerId }, { salonId: providerId }],
    },
    data: {
      ...data,
    },
  });
  const activeServices = await prisma.providerService.findMany({
    where: {
      OR: [{ providerId }, { salonId: providerId }],
      providerCategoryId,
      isActive: true,
    },
  });
  if (activeServices.length === 0) {
    await prisma.providerCategory.update({
      where: {
        id: providerCategoryId,
        OR: [{ providerId }, { salonId: providerId }],
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
      OR: [{ providerId }, { salonId: providerId }],
    },
  });
};
