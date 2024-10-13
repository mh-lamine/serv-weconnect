const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createProviderCategory = async (id, role, data) => {
  const ref =
    role === "USER" ? "providerId" : role === "SALON" ? "salonId" : null;
  const body = {
    ...data,
    [ref]: id,
  };

  return await prisma.providerCategory.create({
    data: { ...body },
  });
};

exports.getProviderCategories = async (id) => {
  return await prisma.providerCategory.findMany({
    where: { OR: [{ providerId: id }, { salonId: id }] },
    include: { services: true },
  });
};

exports.getActiveCategories = async (id) => {
  return await prisma.providerCategory.findMany({
    where: { OR: [{ providerId: id }, { salonId: id }], isActive: true },
    include: {
      services: {
        where: { isActive: true },
      },
    },
  });
};

exports.updateProviderCategory = async (providerId, categoryId, data) => {
  data.isActive === true &&
    (await prisma.providerService.updateMany({
      where: { providerCategoryId: categoryId },
      data: { isActive: true },
    }));
  return await prisma.providerCategory.update({
    where: { id: categoryId, OR: [{ providerId }, { salonId: providerId }] },
    data,
  });
};

exports.deleteProviderCategory = async (providerId, categoryId) => {
  return await prisma.providerCategory.delete({
    where: { id: categoryId, OR: [{ providerId }, { salonId: providerId }] },
  });
};
