const express = require("express");

const { register, login } = require("../controllers/userController");

const validateRequiredFields = require("../middleware/validateMiddleware");

const router = express.Router();

router.post(
  "/register",
  validateRequiredFields(["name", "email", "password"]),
  register,
);

router.post("/login", validateRequiredFields(["email", "password"]), login);

module.exports = router;
