const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

exports.getUser = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      providerCategories: true,
      availabilities: true,
    },
  });
};

exports.getProvidersByFilters = async (filters) => {
  const { id, tags, dayOfWeek, startTime, endTime } = filters;

  const query = {
    where: {
      isProvider: true,
      ...(id && { id }),
      ...(tags && {
        tags: {
          some: {
            name: {
              in: tags,
            },
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
      providerCategories: {
        where: {
          isActive: true,
        },
        include: {
          services: {
            where: {
              isActive: true,
            },
          },
        },
      },
      availabilities: true,
    },
  };

  return await prisma.user.findMany(query);
};

exports.updateUser = async (id, data) => {
  return await prisma.user.update({ where: { id }, data });
};

exports.makeProvider = async (id, userPhoneNumber, password) => {
  const admin = await prisma.user.findUnique({
    where: { id },
  });

  const validPassword = await bcrypt.compare(password, admin.password);

  if (!validPassword) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const user = await prisma.user.findUnique({
    where: { phoneNumber: userPhoneNumber },
  });

  return await prisma.user.update({
    where: { phoneNumber: userPhoneNumber },
    data: {
      isProvider: {
        set: !user.isProvider
      },
    },
  });
};

exports.deleteUser = async (id) => {
  return await prisma.user.delete({ where: { id } });
};
