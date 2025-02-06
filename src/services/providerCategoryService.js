const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createProviderCategory = async (id, role, data) => {
  const ref = role === "PRO" ? "proId" : role === "SALON" ? "salonId" : null;
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
    where: { OR: [{ proId: id }, { salonId: id }] },
    include: { services: true },
  });
};

exports.getActiveCategories = async (id) => {
  return await prisma.providerCategory.findMany({
    where: { OR: [{ proId: id }, { salonId: id }], isActive: true },
    include: {
      services: {
        where: { isActive: true },
      },
    },
  });
};

exports.updateProviderCategory = async (proId, categoryId, data) => {
  data.isActive === true &&
    (await prisma.providerService.updateMany({
      where: { providerCategoryId: categoryId },
      data: { isActive: true },
    }));
  return await prisma.providerCategory.update({
    where: { id: categoryId, OR: [{ proId }, { salonId: proId }] },
    data,
  });
};

// exports.deleteProviderCategory = async (proId, categoryId) => {
//   return await prisma.providerCategory.delete({
//     where: { id: categoryId, OR: [{ proId }, { salonId: proId }] },
//   });
// };
