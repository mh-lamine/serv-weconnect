const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

exports.uploadProfile = async (id, role, file) => {
  const s3 = new S3Client({
    credentials: {
      accessKeyId: process.env.s3_access_key,
      secretAccessKey: process.env.s3_secret_access_key,
    },
    region: "eu-west-3",
  });

  const params = {
    Bucket: "wcntbucket",
    Key: `user-${id}/profile-picture`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);
  const filePath = `https://wcntbucket.s3.eu-west-3.amazonaws.com/user-${id}/profile-picture?t=${new Date().getTime()}`;

  try {
    await s3.send(command);
    if (role === "SALON") {
      return await prisma.salon.update({
        where: { id },
        data: {
          profilePicture: filePath,
        },
      });
    }
    if (role === "PRO") {
      return await prisma.pro.update({
        where: { id },
        data: {
          profilePicture: filePath,
        },
      });
    }
  } catch (error) {
    console.error("Error uploading profile picture:", error);
  }
};

exports.uploadCover = async (id, role, file) => {
  const s3 = new S3Client({
    credentials: {
      accessKeyId: process.env.s3_access_key,
      secretAccessKey: process.env.s3_secret_access_key,
    },
    region: "eu-west-3",
  });

  const params = {
    Bucket: "wcntbucket",
    Key: `user-${id}/cover/cover-image`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);
  const filePath = `https://wcntbucket.s3.eu-west-3.amazonaws.com/user-${id}/cover/cover-image?t=${new Date().getTime()}`;

  try {
    await s3.send(command);
    if (role === "SALON") {
      return await prisma.salon.update({
        where: { id },
        data: {
          coverImage: filePath,
        },
      });
    }
    if (role === "PRO") {
      return await prisma.pro.update({
        where: { id },
        data: {
          coverImage: filePath,
        },
      });
    }
  } catch (error) {
    console.error("Error uploading cover image:", error);
  }
};

exports.deleteProfile = async (id, role) => {
  const s3 = new S3Client({
    region: "eu-west-3",
    credentials: {
      accessKeyId: process.env.s3_access_key,
      secretAccessKey: process.env.s3_secret_access_key,
    },
  });

  const params = {
    Bucket: "wcntbucket",
    Key: `user-${id}/profile-picture`,
  };

  try {
    await s3.send(new DeleteObjectCommand(params));
    if (role === "SALON") {
      return await prisma.salon.update({
        where: { id },
        data: {
          profilePicture: null,
        },
      });
    }
    if (role === "PRO") {
      return await prisma.pro.update({
        where: { id },
        data: {
          profilePicture: null,
        },
      });
    }
    console.log("Profile picture deleted successfully");
  } catch (err) {
    console.error("Error deleting profile picture from S3:", err);
  }
};

exports.deleteCover = async (id, role) => {
  const s3 = new S3Client({
    region: "eu-west-3",
    credentials: {
      accessKeyId: process.env.s3_access_key,
      secretAccessKey: process.env.s3_secret_access_key,
    },
  });

  const params = {
    Bucket: "wcntbucket",
    Key: `user-${id}/cover/cover-image`,
  };

  try {
    await s3.send(new DeleteObjectCommand(params));
    if (role === "SALON") {
      return await prisma.salon.update({
        where: { id },
        data: {
          coverImage: null,
        },
      });
    }
    if (role === "PRO") {
      return await prisma.pro.update({
        where: { id },
        data: {
          coverImage: null,
        },
      });
    }
    console.log("Profile picture deleted successfully");
  } catch (err) {
    console.error("Error deleting profile picture from S3:", err);
  }
};
