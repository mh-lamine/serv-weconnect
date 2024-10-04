const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const sanitize = require("sanitize-filename");
const path = require("path");

exports.uploadProfile = async (id, file) => {
  const s3 = new S3Client({
    region: "eu-west-3",
    credentials: {
      accessKeyId: process.env.s3_access_key,
      secretAccessKey: process.env.s3_secret_access_key,
    },
  });

  // Sanitize file name
  const ext = path.extname(file.originalname);
  let sanitizedFileName = sanitize(path.basename(file.originalname, ext));
  sanitizedFileName = sanitizedFileName.replace(/\s+/g, "_"); // Replace spaces with underscores
  const finalFileName = `${sanitizedFileName}${ext}`;

  const [table1, table2] = await prisma.$transaction([
    prisma.user.findUnique({
      where: { id },
      select: { profilePicture: true },
    }),
    prisma.salon.findUnique({
      where: { id },
      select: { profilePicture: true },
    }),
  ]);

  const user = table1 || table2;
  const isSalon = !!table2;

  // Delete previous profile picture from S3
  if (user?.profilePicture) {
    const previousKey = user.profilePicture.split(".com/")[1];
    const deleteParams = {
      Bucket: "wcntbucket",
      Key: previousKey,
    };

    try {
      await s3.send(new DeleteObjectCommand(deleteParams));
      console.log("Previous profile picture deleted successfully");
    } catch (err) {
      console.error("Error deleting previous profile picture from S3:", err);
    }
  }

  // Upload new profile picture
  const uploadParams = {
    Bucket: "wcntbucket",
    Key: `user-${id}/${finalFileName}`, // Use sanitized file name here
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    await s3.send(new PutObjectCommand(uploadParams));
    const filePath = `https://wcntbucket.s3.eu-west-3.amazonaws.com/user-${id}/${finalFileName}`;

    if (isSalon) {
      await prisma.salon.update({
        where: { id },
        data: {
          profilePicture: filePath,
        },
      });
    } else {
      await prisma.user.update({
        where: { id },
        data: {
          profilePicture: filePath,
        },
      });
    }
    console.log("Profile picture uploaded and database updated successfully");
  } catch (err) {
    console.error("Error uploading new profile picture:", err);
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

  // Sanitize file name
  const ext = path.extname(file.originalname);
  let sanitizedFileName = sanitize(path.basename(file.originalname, ext));
  sanitizedFileName = sanitizedFileName.replace(/\s+/g, "_"); // Replace spaces with underscores
  const finalFileName = `${sanitizedFileName}${ext}`;

  // Find the existing cover image
  const [table1, table2] = await prisma.$transaction([
    prisma.user.findUnique({
      where: { id },
      select: { coverImage: true },
    }),
    prisma.salon.findUnique({
      where: { id },
      select: { coverImage: true },
    }),
  ]);

  const user = table1 || table2;
  const isSalon = !!table2;

  // Delete previous cover image from S3 if it exists
  if (user?.coverImage) {
    const previousKey = user.coverImage.split(".com/")[1];
    const deleteParams = {
      Bucket: "wcntbucket",
      Key: previousKey,
    };

    try {
      await s3.send(new DeleteObjectCommand(deleteParams));
      console.log("Previous cover image deleted successfully");
    } catch (err) {
      console.error("Error deleting previous cover image from S3:", err);
    }
  }

  // Upload new cover image
  const uploadParams = {
    Bucket: "wcntbucket",
    Key: `user-${id}/cover/${finalFileName}`, // Use sanitized file name here
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    await s3.send(new PutObjectCommand(uploadParams));
    const filePath = `https://wcntbucket.s3.eu-west-3.amazonaws.com/user-${id}/cover/${finalFileName}`;

    if (isSalon) {
      return await prisma.salon.update({
        where: { id },
        data: {
          coverImage: filePath,
        },
      });
    }
    return await prisma.user.update({
      where: { id },
      data: {
        coverImage: filePath,
      },
    });
  } catch (err) {
    console.error("Error uploading new cover image:", err);
  }
};

exports.deleteProfile = async (id) => {
  const [table1, table2] = await prisma.$transaction([
    prisma.user.findUnique({
      where: { id },
      select: { profilePicture: true },
    }),
    prisma.salon.findUnique({
      where: { id },
      select: { profilePicture: true },
    }),
  ]);

  const user = table1 || table2;
  const isSalon = !!table2;

  if (user?.profilePicture) {
    const s3 = new S3Client({
      region: "eu-west-3",
      credentials: {
        accessKeyId: process.env.s3_access_key,
        secretAccessKey: process.env.s3_secret_access_key,
      },
    });

    const key = user.profilePicture.split(".com/")[1].trim();
    const params = {
      Bucket: "wcntbucket",
      Key: key,
    };

    try {
      await s3.send(new DeleteObjectCommand(params));
      console.log("Profile picture deleted successfully");
    } catch (err) {
      console.error("Error deleting profile picture from S3:", err);
    }
  }

  if (isSalon) {
    return await prisma.salon.update({
      where: { id },
      data: {
        profilePicture: null,
      },
    });
  }
  return await prisma.user.update({
    where: { id },
    data: {
      profilePicture: null,
    },
  });
};

exports.deleteCover = async (id) => {
  const [table1, table2] = await prisma.$transaction([
    prisma.user.findUnique({
      where: { id },
      select: { coverImage: true },
    }),
    prisma.salon.findUnique({
      where: { id },
      select: { coverImage: true },
    }),
  ]);

  const user = table1 || table2;
  const isSalon = !!table2;

  if (user?.coverImage) {
    const s3 = new S3Client({
      region: "eu-west-3",
      credentials: {
        accessKeyId: process.env.s3_access_key,
        secretAccessKey: process.env.s3_secret_access_key,
      },
    });

    const key = user.coverImage.split(".com/")[1].trim();
    const params = {
      Bucket: "wcntbucket",
      Key: key,
    };

    try {
      await s3.send(new DeleteObjectCommand(params));
      console.log("params", params);
    } catch (err) {
      console.error("Error deleting cover image from S3:", err);
    }
  }

  if (isSalon) {
    return await prisma.salon.update({
      where: { id },
      data: {
        coverImage: null,
      },
    });
  }
  return await prisma.user.update({
    where: { id },
    data: {
      coverImage: null,
    },
  });
};
