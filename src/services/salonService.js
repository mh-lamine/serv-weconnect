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
  return await prisma.member.findUnique({
    where: { id: memberId, salonId },
    include: { services: true },
  });
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
  const newMember = await prisma.member.create({
    data: { ...data, salonId: id },
  });

  await prisma.refreshToken.create({
    data: { token: null, memberId: newMember.id },
  });
};

exports.updateSalon = async (id, data) => {
  return await prisma.salon.update({ where: { id }, data: { ...data } });
};

exports.assignServices = async (salonId, memberId, services) => {
  return await prisma.member.update({
    where: {
      id: memberId,
      salonId,
    },
    data: {
      services: {
        set: services.map((service) => ({ id: service })),
      },
    },
  });
};

exports.removeMember = async (salonId, memberId) => {
  return await prisma.member.delete({
    where: {
      id: memberId,
      salonId,
    },
  });
};
