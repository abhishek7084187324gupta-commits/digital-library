const express = require("express");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const {
  getDashboardStats,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/adminController");

const router = express.Router();

// Dashboard
router.get("/dashboard", protect, adminOnly, getDashboardStats);

// Get All Users
router.get("/users", protect, adminOnly, getAllUsers);

// Update User
router.put("/users/:id", protect, adminOnly, updateUser);

// Delete User
router.delete("/users/:id", protect, adminOnly, deleteUser);

module.exports = router;
