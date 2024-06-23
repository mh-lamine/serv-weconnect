// src/utils/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
};
