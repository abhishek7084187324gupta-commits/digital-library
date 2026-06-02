const express = require("express");
const multer = require("multer");

const {
  uploadBook,
  getBooks,
  downloadBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const { protect, facultyOrAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

/* MULTER STORAGE */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* UPLOAD BOOK
   file = PDF
   coverImage = Thumbnail image
*/
router.post(
  "/upload",
  protect,
  facultyOrAdmin,
  upload.fields([
    {
      name: "file",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  uploadBook,
);

/* GET ALL BOOKS */
router.get("/", getBooks);

/* PREVIEW BOOK */
router.get("/download/:id", downloadBook);

/* UPDATE BOOK */
router.put(
  "/update/:id",
  protect,
  facultyOrAdmin,
  upload.fields([
    {
      name: "file",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  updateBook,
);

/* DELETE BOOK */
router.delete("/delete/:id", protect, facultyOrAdmin, deleteBook);

module.exports = router;
