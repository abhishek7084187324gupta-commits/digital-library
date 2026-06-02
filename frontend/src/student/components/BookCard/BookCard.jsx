import React from "react";
import "./BookCard.css";

function BookCard({ book }) {
  return (
    <div className="book-card">
      {/* Cover Image */}
      {book.coverImage ? (
        <img
          src={`http://localhost:5000/uploads/${book.coverImage}`}
          alt={book.title}
          className="book-cover"
        />
      ) : (
        <div className="book-placeholder">No Cover</div>
      )}

      <h3>{book.title}</h3>

      <p>
        <strong>Author:</strong> {book.author}
      </p>

      <p>
        <strong>Category:</strong> {book.category}
      </p>

      <p>
        <strong>Semester:</strong> {book.semester}
      </p>

      <p>
        <strong>Subject:</strong> {book.subject}
      </p>

      <p>
        <strong>Views:</strong> {book.downloads}
      </p>

      <a
        href={`http://localhost:5000/api/books/download/${book._id}`}
        target="_blank"
        rel="noreferrer"
        className="preview-btn"
      >
        Preview PDF
      </a>
    </div>
  );
}

export default BookCard;
