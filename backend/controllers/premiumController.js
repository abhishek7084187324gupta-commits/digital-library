const PremiumContent = require("../models/PremiumContent");

/* UPLOAD PREMIUM CONTENT */
exports.uploadPremiumContent = async (req, res) => {
  try {
    const { title, subject, semester, price, description } = req.body;

    const content = await PremiumContent.create({
      title,
      subject,
      semester,
      price,
      description,

      /* full premium file */
      fullFile: req.files.fullFile[0].filename,

      /* preview sample file */
      previewFile: req.files.previewFile[0].filename,

      /* cover image */
      coverImage: req.files.coverImage?.[0]?.filename || "",
    });

    res.status(201).json({
      success: true,
      message: "Premium content uploaded successfully",
      content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* GET ALL PREMIUM CONTENT */
exports.getPremiumContent = async (req, res) => {
  try {
    const { subject, semester } = req.query;

    let filter = {};

    if (subject) {
      filter.subject = subject;
    }

    if (semester) {
      filter.semester = semester;
    }

    const content = await PremiumContent.find(filter).sort({
      uploadedAt: -1,
    });

    res.json({
      success: true,
      content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* PREVIEW SAMPLE PDF */
exports.previewPremiumContent = async (req, res) => {
  try {
    const content = await PremiumContent.findById(req.params.id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Premium content not found",
      });
    }

    res.download(`uploads/premium/${content.previewFile}`);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* FULL DOWNLOAD AFTER PAYMENT */
exports.downloadPremiumContent = async (req, res) => {
  try {
    const content = await PremiumContent.findById(req.params.id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Premium content not found",
      });
    }

    res.download(`uploads/premium/${content.fullFile}`);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* UPDATE PREMIUM CONTENT */
exports.updatePremiumContent = async (req, res) => {
  try {
    const { title, subject, semester, price, description } = req.body;

    const premium = await PremiumContent.findById(req.params.id);

    if (!premium) {
      return res.status(404).json({
        success: false,
        message: "Premium content not found",
      });
    }

    premium.title = title || premium.title;

    premium.subject = subject || premium.subject;

    premium.semester = semester || premium.semester;

    premium.price = price || premium.price;

    premium.description = description || premium.description;

    /* optional cover image update */
    if (req.files && req.files.coverImage) {
      premium.coverImage = req.files.coverImage[0].filename;
    }

    /* optional full pdf replace */
    if (req.files && req.files.fullFile) {
      premium.fullFile = req.files.fullFile[0].filename;
    }

    /* optional preview pdf replace */
    if (req.files && req.files.previewFile) {
      premium.previewFile = req.files.previewFile[0].filename;
    }

    const updatedPremium = await premium.save();

    res.json({
      success: true,
      message: "Premium content updated successfully",
      premium: updatedPremium,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* DELETE PREMIUM CONTENT */
exports.deletePremiumContent = async (req, res) => {
  try {
    const premium = await PremiumContent.findById(req.params.id);

    if (!premium) {
      return res.status(404).json({
        success: false,
        message: "Premium content not found",
      });
    }

    await premium.deleteOne();

    res.json({
      success: true,
      message: "Premium content deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
