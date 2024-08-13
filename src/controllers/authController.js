const authService = require("../services/authService");

exports.registerUser = async (req, res) => {
  try {
    const { accessToken, refreshToken, isProvider } =
      await authService.registerUser(req.body);
    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "Lax",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
      })
      .json({ accessToken, isProvider });
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
    const { accessToken, refreshToken, isProvider } =
      await authService.loginUser(phoneNumber, password);
    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "Lax",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
      })
      .json({ accessToken, isProvider });
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
    const { accessToken, isProvider } = await authService.refreshToken(
      refreshToken
    );
    return res.json({ accessToken, isProvider });
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
      })
      .json({ message: "Logged out" });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};
