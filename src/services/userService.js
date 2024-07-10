const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.registerUser = async (data) => {
  // Check if user already exists
  const userExists = await prisma.user.findFirst({
    where: { email: data.email, phoneNumber: data.phoneNumber },
  });
  if (userExists) {
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  // Create user
  const newUser = await prisma.user.create({
    data: { ...data, password: hashedPassword },
  });

  return newUser;
};

exports.loginUser = async (phoneNumber, password) => {
  // Check if user exists
  const user = await prisma.user.findFirst({
    where: { phoneNumber },
  });

  if (!user) {
    throw new Error("invalid credentials");
  }

  // Compare passwords
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error("Invalid credentials");
  }

  return user
};

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
  const { tags, dayOfWeek, startTime, endTime } = filters;

  const query = {
    where: {
      isProvider: true,
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
      providerCategories: true,
      availabilities: true,
    },
  };

  return await prisma.user.findMany(query);
};

exports.updateUser = async (id, data) => {
  return await prisma.user.update({ where: { id }, data });
};

exports.deleteUser = async (id) => {
  return await prisma.user.delete({ where: { id } });
};
