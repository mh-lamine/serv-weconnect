const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const { DateTime } = require("luxon");

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
      specialAvailabilities: {
        where: {
          date: {
            gte: DateTime.now().toISODate(),
          },
        },
      },
    },
  };

  try {
    const [table1, table2] = await prisma.$transaction([
      prisma.pro.findMany(query),
      prisma.salon.findMany(query),
    ]);
    return table1.concat(table2);
  } catch (error) {
    console.log(error);
  }
};

exports.updateUser = async (id, data) => {
  return await prisma.user.update({ where: { id }, data });
};

exports.makeProvider = async (userPhoneNumber, password) => {
  const admin = await prisma.user.findUnique({
    where: {
      phoneNumber: "0768580893",
    },
  });

  const validPassword = await bcrypt.compare(password, admin.password);

  if (!validPassword) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const [table1, table2] = await prisma.$transaction([
    await prisma.user.findUnique({
      where: { phoneNumber: userPhoneNumber },
    }),
    await prisma.salon.findUnique({
      where: { phoneNumber: userPhoneNumber },
    }),
  ]);

  const user = table1 || table2;

  return await prisma.user.update({
    where: { phoneNumber: userPhoneNumber },
    data: {
      isProvider: {
        set: !user.isProvider,
      },
    },
  });
};

exports.deleteUser = async (id) => {
  return await prisma.user.delete({ where: { id } });
};
