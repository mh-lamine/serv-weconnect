const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

exports.registerSalon = async (data) => {
  const { phoneNumber, email, password } = data;

  // Check if the salon already exists by phone number or email
  const salonExists = await prisma.salon.findFirst({
    where: {
      OR: [{ phoneNumber }, { email }],
    },
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

  const [table1, table2, table3] = await prisma.$transaction([
    prisma.user.findFirst({
      where: { id: userToken.userId || undefined },
    }),
    prisma.salon.findFirst({
      where: { id: userToken.salonId || undefined },
    }),
    prisma.member.findFirst({
      where: { id: userToken.memberId || undefined },
    }),
  ]);

  const user = table1 || table2 || table3;

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
  return { accessToken, isProvider: user.isProvider || null };
};

exports.logout = async (refreshToken) => {
  await prisma.refreshToken.update({
    where: { token: refreshToken },
    data: { token: null },
  });
};
