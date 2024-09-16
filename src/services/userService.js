const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const { DateTime } = require("luxon");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

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
      specialAvailabilities: {
        where: {
          date: {
            gte: DateTime.now().toISODate(),
          },
        },
      },
    },
  };

  return await prisma.user.findMany(query);
};

exports.uploadProfile = async (id, file) => {
  const s3 = new S3Client({
    region: "eu-west-3",
    credentials: {
      accessKeyId: process.env.s3_access_key,
      secretAccessKey: process.env.s3_secret_access_key,
    },
  });

  const params = {
    Bucket: "wcntbucket",
    Key: `user-${id}/${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    await s3.send(new PutObjectCommand(params));
    const filePath = `https://wcntbucket.s3.eu-west-3.amazonaws.com/user-${id}/${file.originalname}
`;
    return await prisma.user.update({
      where: { id },
      data: {
        profilePicture: filePath,
      },
    });
  } catch (err) {
    console.error("Erreur lors du téléchargement du fichier :", err);
  }
};

exports.uploadCover = async (id, file) => {
  const s3 = new S3Client({
    region: "eu-west-3",
    credentials: {
      accessKeyId: process.env.s3_access_key,
      secretAccessKey: process.env.s3_secret_access_key,
    },
  });

  const params = {
    Bucket: "wcntbucket",
    Key: `user-${id}/cover/${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    await s3.send(new PutObjectCommand(params));
    const filePath = `https://wcntbucket.s3.eu-west-3.amazonaws.com/user-${id}/cover/${file.originalname}
`;

    return await prisma.user.update({
      where: { id },
      data: {
        coverImage: filePath,
      },
    });
  } catch (err) {
    console.error("Erreur lors du téléchargement du fichier :", err);
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

  const user = await prisma.user.findUnique({
    where: { phoneNumber: userPhoneNumber },
  });

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
