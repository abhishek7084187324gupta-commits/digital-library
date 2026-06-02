const BookRequest = require("../models/BookRequest");

/* CREATE REQUEST */
exports.createRequest = async (req, res) => {
  try {
    const { studentName, email, bookTitle, subject, semester, message } =
      req.body;

    const request = await BookRequest.create({
      studentName,
      email,
      bookTitle,
      subject,
      semester,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Request submitted successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* GET ALL REQUESTS */
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await BookRequest.find().sort({
      requestedAt: -1,
    });

    res.json({
      success: true,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* UPDATE REQUEST STATUS */
exports.updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const request = await BookRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    request.status = status || request.status;

    const updatedRequest = await request.save();

    res.json({
      success: true,
      message: "Request status updated successfully",
      request: updatedRequest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* DELETE REQUEST */
exports.deleteRequest = async (req, res) => {
  try {
    const request = await BookRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    await request.deleteOne();

    res.json({
      success: true,
      message: "Request deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
