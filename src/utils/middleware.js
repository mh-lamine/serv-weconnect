const jwt = require("jsonwebtoken");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // Check if token exists
  if (!authHeader) return res.status(401).json({ message: "Access Denied" });

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
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

module.exports = { verifyToken, upload };
