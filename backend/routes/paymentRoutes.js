const express = require("express");

const {
  createPayment,
  getAllPayments,
  updatePaymentStatus,
  deletePayment,
  checkPaymentStatus,
} = require("../controllers/paymentController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/* STUDENT CREATE PAYMENT */
router.post("/create", createPayment);

/* CHECK PAYMENT STATUS
   for premium unlock
*/
router.get("/check/:premiumId", checkPaymentStatus);

/* ADMIN GET ALL PAYMENTS */
router.get("/", protect, adminOnly, getAllPayments);

/* ADMIN UPDATE PAYMENT STATUS */
router.put("/update/:id", protect, adminOnly, updatePaymentStatus);

/* ADMIN DELETE PAYMENT */
router.delete("/delete/:id", protect, adminOnly, deletePayment);

module.exports = router;
