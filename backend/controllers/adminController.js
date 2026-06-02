const User = require("../models/User");
const Book = require("../models/Book");
const PYQ = require("../models/PYQ");
const PremiumContent = require("../models/PremiumContent");
const BookRequest = require("../models/BookRequest");
const Payment = require("../models/Payment");

// Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBooks = await Book.countDocuments();
    const totalPYQ = await PYQ.countDocuments();
    const totalPremiumContent = await PremiumContent.countDocuments();
    const totalRequests = await BookRequest.countDocuments();
    const totalRevenueData = await Payment.find();

    const totalRevenue = totalRevenueData.reduce(
      (sum, item) => sum + item.amount,
      0,
    );

    res.json({
      totalUsers,
      totalBooks,
      totalPYQ,
      totalPremiumContent,
      totalRequests,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    const updatedUser = await user.save();

    res.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.deleteOne();

    res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  updateUser,
  deleteUser,
};
