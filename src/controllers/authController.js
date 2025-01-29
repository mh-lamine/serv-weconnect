const authService = require("../services/authService");

exports.registerUser = async (req, res) => {
  try {
    const { newUser, accessToken, refreshToken } =
      await authService.registerUser(req.body);
    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "Lax",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
        domain: "www.weconnect-rdv.fr",
      })
      .json({ accessToken, ...newUser });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.registerPro = async (req, res) => {
  try {
    const { newPro, accessToken, refreshToken } = await authService.registerPro(
      req.body
    );
    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "Lax",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
        domain: "pro.weconnect-rdv.fr",
      })
      .json({ accessToken, ...newPro });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.registerSalon = async (req, res) => {
  try {
    const { newSalon, accessToken, refreshToken } =
      await authService.registerSalon(req.body);
    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "Lax",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
        domain: "entreprise.weconnect-rdv.fr",
      })
      .json({ accessToken, ...newSalon });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    if (!phoneNumber || !password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const { user, accessToken, refreshToken } = await authService.loginUser(
      phoneNumber,
      password
    );
    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "Lax",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
        domain: "www.weconnect-rdv.fr",
      })
      .json({ ...user, accessToken });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.loginPro = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const { pro, accessToken, refreshToken } = await authService.loginPro(
      email,
      password
    );
    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "Lax",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
        domain: "pro.weconnect-rdv.fr",
      })
      .json({ ...pro, accessToken });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.loginSalon = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const { salon, accessToken, refreshToken } = await authService.loginSalon(
      email,
      password
    );
    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "Lax",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
        domain: "entreprise.weconnect-rdv.fr",
      })
      .json({ ...salon, accessToken });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.loginMember = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const { member, accessToken, refreshToken } = await authService.loginMember(
      email,
      password
    );
    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "Lax",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
        domain: "entreprise.weconnect-rdv.fr",
      })
      .json({ ...member, accessToken });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) {
    return res.sendStatus(401);
  }
  const refreshToken = cookies.refreshToken;
  try {
    const user = await authService.refreshToken(refreshToken);
    return res.json(user);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) return res.sendStatus(204);
  const refreshToken = cookies.refreshToken;

  try {
    await authService.logout(refreshToken);
    return res
      .clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "Lax",
        secure: true,
        domain: ".weconnect-rdv.fr",
      })
      .json({ message: "Logged out" });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};
