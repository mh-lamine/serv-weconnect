const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendSMS } = require("../utils/businessLogic");

exports.registerUser = async (data) => {
  const { phoneNumber, password } = data;
  // Check if user already exists
  const userExists = await prisma.user.findFirst({
    where: { phoneNumber },
  });
  if (userExists) {
    const error = new Error("User already exists");
    error.statusCode = 409;
    throw error;
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const newUser = await prisma.user.create({
    data: { ...data, password: hashedPassword },
  });

  // Generate tokens
  const accessToken = jwt.sign(
    { id: newUser.id, role: newUser.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" }
  );
  const refreshToken = jwt.sign(
    { id: newUser.id, role: newUser.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // create refresh token in database
  await prisma.refreshToken.create({
    data: { token: refreshToken, userId: newUser.id },
  });

  return { accessToken, refreshToken, newUser };
};

exports.registerPro = async (data) => {
  const { email, password } = data;

  // Check if the pro already exists by email
  const proExists = await prisma.pro.findFirst({
    where: { email },
  });

  if (proExists) {
    const error = new Error("Pro already exists");
    error.statusCode = 409;
    throw error;
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create pro
  const newPro = await prisma.pro.create({
    data: { ...data, password: hashedPassword },
  });

  // Generate tokens
  const accessToken = jwt.sign(
    { id: newPro.id, role: newPro.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" }
  );
  const refreshToken = jwt.sign(
    { id: newPro.id, role: newPro.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // create refresh token in database
  await prisma.refreshToken.create({
    data: { token: refreshToken, proId: newPro.id },
  });

  return { accessToken, refreshToken, newPro };
};

exports.registerSalon = async (data) => {
  const { email, password } = data;

  // Check if the salon already exists by phone number or email
  const salonExists = await prisma.salon.findFirst({
    where: { email },
  });

  if (salonExists) {
    const error = new Error("Salon already exists");
    error.statusCode = 409;
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newSalon = await prisma.salon.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });

  // Generate tokens
  const accessToken = jwt.sign(
    { id: newSalon.id, role: newSalon.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" }
  );
  const refreshToken = jwt.sign(
    { id: newSalon.id, role: newSalon.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // create refresh token in database
  await prisma.refreshToken.create({
    data: { token: refreshToken, salonId: newSalon.id },
  });

  return { accessToken, refreshToken, newSalon };
};

exports.loginUser = async (phoneNumber, password) => {
  console.log("phoneNumczjnlvrber", phoneNumber);
  // Check if user exists
  const user = await prisma.user.findFirst({
    where: { phoneNumber },
  });

  if (!user) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  // Compare passwords
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  // Generate tokens
  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" }
  );
  const refreshToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // update refresh token in database
  await prisma.refreshToken.update({
    where: { userId: user.id },
    data: { token: refreshToken },
  });

  return { user, accessToken, refreshToken };
};

exports.loginPro = async (email, password) => {
  // Check if pro exists
  const pro = await prisma.pro.findFirst({
    where: { email },
  });

  if (!pro) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  // Compare passwords
  const validPassword = await bcrypt.compare(password, pro.password);

  if (!validPassword) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  // Generate tokens
  const accessToken = jwt.sign(
    { id: pro.id, role: pro.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" }
  );
  const refreshToken = jwt.sign(
    { id: pro.id, role: pro.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // update refresh token in database
  await prisma.refreshToken.update({
    where: { proId: pro.id },
    data: { token: refreshToken },
  });

  return { pro, accessToken, refreshToken };
};

exports.loginSalon = async (email, password) => {
  // Check if salon exists
  const salon = await prisma.salon.findFirst({
    where: { email },
  });

  if (!salon) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  // Compare passwords
  const validPassword = await bcrypt.compare(password, salon.password);

  if (!validPassword) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  // Generate tokens
  const accessToken = jwt.sign(
    { id: salon.id, role: salon.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" }
  );
  const refreshToken = jwt.sign(
    { id: salon.id, role: salon.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // update refresh token in database
  await prisma.refreshToken.update({
    where: { salonId: salon.id },
    data: { token: refreshToken },
  });

  return { salon, accessToken, refreshToken };
};

exports.loginMember = async (email, password) => {
  const { members } = await prisma.salon.findFirst({
    where: { email },
    include: { members: true },
  });

  const member = members.find((member) => member.accessCode === password);

  if (!member) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  // Generate tokens
  const accessToken = jwt.sign(
    { id: member.id, role: member.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" }
  );
  const refreshToken = jwt.sign(
    { id: member.id, role: member.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // update refresh token in database
  await prisma.refreshToken.update({
    where: { memberId: member.id },
    data: { token: refreshToken },
  });

  return { member, accessToken, refreshToken };
};

exports.refreshToken = async (refreshToken) => {
  const userToken = await prisma.refreshToken.findFirst({
    where: { token: refreshToken },
  });

  if (!userToken) {
    throw new Error("Token non valide ou expiré.");
  }

  const table = userToken.userId
    ? "user"
    : userToken.proId
    ? "pro"
    : userToken.salonId
    ? "salon"
    : userToken.memberId
    ? "member"
    : null;

  const id =
    table === "user"
      ? userToken.userId
      : table === "pro"
      ? userToken.proId
      : table === "salon"
      ? userToken.salonId
      : table === "member"
      ? userToken.memberId
      : null;

  const user = await prisma[table].findFirst({
    where: { id },
  });

  // Verify token
  const accessToken = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, userToken) => {
      if (err) return res.status(403);
      return jwt.sign(
        { id: userToken.id, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "30m",
        }
      );
    }
  );
  return { ...user, accessToken };
};

exports.logout = async (refreshToken) => {
  await prisma.refreshToken.update({
    where: { token: refreshToken },
    data: { token: null },
  });
};

exports.forgotPassword = async (phoneNumber) => {
  const user = await prisma.user.findFirst({
    where: { phoneNumber },
  });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  // Generate token
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  try {
    await sendSMS(
      phoneNumber,
      `Cliquez sur le lien pour réinitialiser votre mot de passe: https://www.weconnect-rdv.fr/reset-password/${token}\nCe lien expirera dans 15 minutes.`
    );
    return token;
  } catch (error) {
    return error;
  }
};

exports.resetPassword = async (token, newPassword) => {
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const { resetToken } = await prisma.user.findFirst({
    where: { id: decoded.id },
  });

  if (resetToken == token) {
    console.log("Token already used");
    const error = new Error("Token already used");
    error.statusCode = 403;
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  return await prisma.user.update({
    where: { id: decoded.id },
    data: { password: hashedPassword },
  });
};
