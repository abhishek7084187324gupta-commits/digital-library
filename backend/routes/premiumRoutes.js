const express = require("express");
const multer = require("multer");

const {
  uploadPremiumContent,
  getPremiumContent,
  previewPremiumContent,
  downloadPremiumContent,
  updatePremiumContent,
  deletePremiumContent,
} = require("../controllers/premiumController");

const { protect, facultyOrAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

/* MULTER STORAGE */
const storage = multer.diskStorage({
  destination: "uploads/premium/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* UPLOAD PREMIUM CONTENT
   fullFile = full premium pdf
   previewFile = preview sample pdf
   coverImage = premium thumbnail image
*/
router.post(
  "/upload",
  protect,
  facultyOrAdmin,
  upload.fields([
    {
      name: "fullFile",
      maxCount: 1,
    },
    {
      name: "previewFile",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  uploadPremiumContent,
);

/* GET ALL PREMIUM CONTENT */
router.get("/", getPremiumContent);

/* PREVIEW SAMPLE PDF */
router.get("/preview/:id", previewPremiumContent);

/* FULL DOWNLOAD AFTER PAYMENT */
router.get("/download/:id", downloadPremiumContent);

/* UPDATE PREMIUM CONTENT */
router.put(
  "/update/:id",
  protect,
  facultyOrAdmin,
  upload.fields([
    {
      name: "fullFile",
      maxCount: 1,
    },
    {
      name: "previewFile",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  updatePremiumContent,
);

/* DELETE PREMIUM CONTENT */
router.delete("/delete/:id", protect, facultyOrAdmin, deletePremiumContent);

module.exports = router;
