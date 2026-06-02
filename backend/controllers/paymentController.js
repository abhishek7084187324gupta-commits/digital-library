const Payment = require("../models/Payment");

/* CREATE PAYMENT */
exports.createPayment = async (req, res) => {
  try {
    const { userName, email, contentTitle, amount, premiumId, userId } =
      req.body;

    const payment = await Payment.create({
      userName,
      email,
      contentTitle,
      amount,
      premiumId,
      userId,
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Payment created successfully",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* GET ALL PAYMENTS */
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* CHECK PAYMENT STATUS FOR PREMIUM UNLOCK */
exports.checkPaymentStatus = async (req, res) => {
  try {
    const { userId } = req.query;
    const { premiumId } = req.params;

    const payment = await Payment.findOne({
      userId,
      premiumId,
      status: "Completed",
    });

    if (payment) {
      return res.json({
        success: true,
        paid: true,
      });
    }

    res.json({
      success: true,
      paid: false,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* UPDATE PAYMENT STATUS */
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    payment.status = status || payment.status;

    const updatedPayment = await payment.save();

    res.json({
      success: true,
      message: "Payment status updated successfully",
      payment: updatedPayment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* DELETE PAYMENT */
exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    await payment.deleteOne();

    res.json({
      success: true,
      message: "Payment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
