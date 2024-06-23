const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createService = async (data) => {
  return await prisma.service.create({ data });
};

exports.updateService = async (id, data) => {
  return await prisma.service.update({ where: { id }, data });
};

exports.deleteService = async (id) => {
  return await prisma.service.delete({ where: { id } });
};
