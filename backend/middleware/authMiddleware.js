const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized access",
    });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access only",
    });
  }

  next();
};

const facultyOrAdmin = (req, res, next) => {
  if (req.user.role !== "admin" && req.user.role !== "faculty") {
    return res.status(403).json({
      message: "Faculty/Admin access only",
    });
  }

  next();
};

module.exports = {
  protect,
  adminOnly,
  facultyOrAdmin,
};
