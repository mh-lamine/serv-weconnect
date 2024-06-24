const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createAvailability = async (data) => {
  return await prisma.availability.create({ data });
};

exports.getProviderAvailabilities = async (id) => {
  return await prisma.availability.findMany({ where: {
    providerId: id
  } });
};

exports.updateAvailability = async (id, data) => {
  return await prisma.availability.update({ where: { id }, data });
};

exports.deleteAvailability = async (id) => {
  return await prisma.availability.delete({ where: { id } });
};
