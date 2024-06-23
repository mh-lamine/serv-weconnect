const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createUser = async (data) => {
  return await prisma.user.create({ data });
};

exports.getProviders = async (filters) => {
  const { category, serviceId, dayOfWeek, startTime, endTime } = filters;

  const query = {
    where: {
      isProvider: true,
      ...(category && {
        providerServices: {
          some: {
            service: {
              category: {
                name: category,
              },
            },
          },
        },
      }),
      ...(serviceId && {
        providerServices: {
          some: {
            serviceId: serviceId,
          },
        },
      }),
      ...(dayOfWeek &&
        startTime &&
        endTime && {
          availabilities: {
            some: {
              dayOfWeek: dayOfWeek,
              startTime: {
                lte: new Date(startTime),
              },
              endTime: {
                gte: new Date(endTime),
              },
            },
          },
        }),
    },
    include: {
      providerServices: {
        include: {
          service: true,
        },
      },
      availabilities: true,
    },
  };

  return await prisma.user.findMany(query);
};

exports.getUserById = async (id) => {
  return await prisma.user.findUnique({ where: { id } });
};

exports.updateUser = async (id, data) => {
  return await prisma.user.update({ where: { id }, data });
};

exports.deleteUser = async (id) => {
  return await prisma.user.delete({ where: { id } });
};