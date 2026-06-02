const Book = require("../models/Book");
const path = require("path");

/* UPLOAD BOOK */
exports.uploadBook = async (req, res) => {
  try {
    const { title, author, category, semester, subject, description } =
      req.body;

    const book = await Book.create({
      title,
      author,
      category,
      semester,
      subject,
      description,

      /* PDF */
      file: req.files.file[0].filename,

      /* Cover Image */
      coverImage: req.files.coverImage?.[0]?.filename || "",
    });

    res.json({
      success: true,
      message: "Book uploaded successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* GET ALL BOOKS */
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({
      uploadedAt: -1,
    });

    res.json({
      success: true,
      books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* PREVIEW BOOK (NO DOWNLOAD) */
exports.downloadBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    book.downloads += 1;
    await book.save();

    const filePath = path.resolve(`uploads/${book.file}`);

    res.sendFile(filePath);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* UPDATE BOOK */
exports.updateBook = async (req, res) => {
  try {
    const { title, author, category, semester, subject, description } =
      req.body;

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.category = category || book.category;
    book.semester = semester || book.semester;
    book.subject = subject || book.subject;
    book.description = description || book.description;

    /* Optional cover image update */
    if (req.files && req.files.coverImage) {
      book.coverImage = req.files.coverImage[0].filename;
    }

    /* Optional PDF replace */
    if (req.files && req.files.file) {
      book.file = req.files.file[0].filename;
    }

    const updatedBook = await book.save();

    res.json({
      success: true,
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* DELETE BOOK */
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    await book.deleteOne();

    res.json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
