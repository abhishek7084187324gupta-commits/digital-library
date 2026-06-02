const express = require("express");
const multer = require("multer");

const {
  uploadPYQ,
  getPYQ,
  downloadPYQ,
  updatePYQ,
  deletePYQ,
} = require("../controllers/pyqController");

const { protect, facultyOrAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/pyq/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* Upload PYQ */
router.post(
  "/upload",
  protect,
  facultyOrAdmin,
  upload.single("file"),
  uploadPYQ,
);

/* Get All PYQ */
router.get("/", getPYQ);

/* Download PYQ */
router.get("/download/:id", downloadPYQ);

/* Update PYQ */
router.put("/update/:id", protect, facultyOrAdmin, updatePYQ);

/* Delete PYQ */
router.delete("/delete/:id", protect, facultyOrAdmin, deletePYQ);

module.exports = router;
