const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createTag = async (data) => {
  return await prisma.tag.create({ data });
}

exports.getTags = async () => {
  return await prisma.tag.findMany();
}

exports.updateTag = async (id, data) => {
  return await prisma.tag.update({ where: { id }, data });
}

exports.deleteTag = async (id) => {
  return await prisma.tag.delete({ where: { id } });
}