const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createProviderService = async (id, role, data) => {
  const ref =
    role === "PRO" ? "proId" : role === "SALON" ? "salonId" : null;
  const body = {
    ...data,
    [ref]: id,
  };

  return await prisma.providerService.create({
    data: { ...body },
  });
};

exports.updateProviderService = async (proId, serviceId, data) => {
  const { providerCategoryId } = data;
  await prisma.providerService.update({
    where: {
      id: serviceId,
      OR: [{ proId }, { salonId: proId }],
    },
    data: {
      ...data,
    },
  });
  const activeServices = await prisma.providerService.findMany({
    where: {
      OR: [{ proId }, { salonId: proId }],
      providerCategoryId,
      isActive: true,
    },
  });
  if (activeServices.length === 0) {
    await prisma.providerCategory.update({
      where: {
        id: providerCategoryId,
        OR: [{ proId }, { salonId: proId }],
      },
      data: {
        isActive: false,
      },
    });
  }
};

exports.deleteProviderService = async (proId, serviceId) => {
  return await prisma.providerService.delete({
    where: {
      id: serviceId,
      OR: [{ proId }, { salonId: proId }],
    },
  });
};
