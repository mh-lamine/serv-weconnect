const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getSalon = async (id) => {
  return await prisma.salon.findUnique({ where: { id } });
};

exports.getMembers = async (id) => {
  return await prisma.member.findMany({
    where: { salonId: id },
    orderBy: {
      createdAt: "desc",
    },
  });
};

exports.getMember = async (salonId, memberId) => {
  return await prisma.member.findUnique({ where: { id: memberId, salonId } });
};

exports.updateMember = async (salonId, memberId, data) => {
  return await prisma.member.update({
    where: {
      id: memberId,
      salonId,
    },
    data: { ...data },
  });
};

exports.addMember = async (id, data) => {
  return await prisma.member.create({ data: { ...data, salonId: id } });
};

exports.updateSalon = async (id, data) => {
  return await prisma.salon.update({ where: { id }, data: { ...data } });
};

exports.removeMember = async (salonId, memberId) => {
  return await prisma.member.delete({
    where: {
      id: memberId,
      salonId,
    },
  });
};
