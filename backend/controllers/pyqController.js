const PYQ = require("../models/PYQ");

exports.uploadPYQ = async (req, res) => {
  try {
    const { title, subject, semester, year } = req.body;

    const pyq = await PYQ.create({
      title,
      subject,
      semester,
      year,
      file: req.file.filename,
    });

    res.status(201).json(pyq);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getPYQ = async (req, res) => {
  try {
    const { subject, semester, year } = req.query;

    let filter = {};

    if (subject) {
      filter.subject = subject;
    }

    if (semester) {
      filter.semester = semester;
    }

    if (year) {
      filter.year = year;
    }

    const pyqs = await PYQ.find(filter).sort({
      uploadedAt: -1,
    });

    res.json(pyqs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.downloadPYQ = async (req, res) => {
  try {
    const pyq = await PYQ.findById(req.params.id);

    if (!pyq) {
      return res.status(404).json({
        message: "PYQ not found",
      });
    }

    pyq.downloads += 1;
    await pyq.save();

    res.download(`uploads/${pyq.file}`);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deletePYQ = async (req, res) => {
  try {
    await PYQ.findByIdAndDelete(req.params.id);

    res.json({
      message: "PYQ deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* UPDATE PYQ */
const updatePYQ = async (req, res) => {
  try {
    const { title, subject, semester, year } = req.body;

    const pyq = await PYQ.findById(req.params.id);

    if (!pyq) {
      return res.status(404).json({
        message: "PYQ not found",
      });
    }

    pyq.title = title || pyq.title;
    pyq.subject = subject || pyq.subject;
    pyq.semester = semester || pyq.semester;
    pyq.year = year || pyq.year;

    const updatedPYQ = await pyq.save();

    res.json({
      message: "PYQ updated successfully",
      pyq: updatedPYQ,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* DELETE PYQ */
const deletePYQ = async (req, res) => {
  try {
    const pyq = await PYQ.findById(req.params.id);

    if (!pyq) {
      return res.status(404).json({
        message: "PYQ not found",
      });
    }

    await pyq.deleteOne();

    res.json({
      message: "PYQ deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updatePYQ = updatePYQ;
exports.deletePYQ = deletePYQ;
