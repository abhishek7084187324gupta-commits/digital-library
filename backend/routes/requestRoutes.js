const express = require("express");

const {
  createRequest,
  getAllRequests,
  updateRequestStatus,
  deleteRequest,
} = require("../controllers/requestController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/* Student Create Request */
router.post("/create", createRequest);

/* Admin Get All Requests */
router.get("/", protect, adminOnly, getAllRequests);

/* Admin Update Request */
router.put("/update/:id", protect, adminOnly, updateRequestStatus);

/* Admin Delete Request */
router.delete("/delete/:id", protect, adminOnly, deleteRequest);

module.exports = router;
