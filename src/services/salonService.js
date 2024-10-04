exports.getSalon = async (id) => {
  return await prisma.salon.findUnique({ where: { id } });
};

exports.addMember = async (id, data) => {
  return await prisma.member.create({ data: { ...data, salonId: id } });
};

exports.updateSalon = async (id, data) => {
  return await prisma.salon.update({ where: { id }, data });
};

exports.removeMember = async (salonId, memberId) => {
  return await prisma.member.delete({
    where: {
      id: memberId,
      salonId,
    },
  });
};
