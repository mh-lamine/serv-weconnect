const jwt = require("jsonwebtoken");

exports.generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  // Check if token exists
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid token" });

      // If token is valid, attach user information to request object
      req.user = user;
      next(); // Pass control to the next middleware or route handler
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
