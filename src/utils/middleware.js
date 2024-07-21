const jwt = require("jsonwebtoken");
const allowedOrigins = require("../config/allowedOrigins");

exports.generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });
};
exports.generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // Check if token exists
  if (!authHeader) return res.status(401).json({ message: "Access Denied" });

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    console.log(token);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid token" });

      // If token is valid, attach user information to request object
      req.user = user;
      next(); // Pass control to the next middleware or route handler
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  next();
};
