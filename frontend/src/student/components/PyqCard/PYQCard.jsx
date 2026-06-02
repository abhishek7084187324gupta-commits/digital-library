import React from "react";
import "./PYQCard.css";

function PYQCard({ item }) {
  return (
    <div className="pyq-card">
      <h3>{item.title}</h3>

      <p>
        <strong>Subject:</strong> {item.subject}
      </p>

      <p>
        <strong>Semester:</strong> {item.semester}
      </p>

      <p>
        <strong>Year:</strong> {item.year}
      </p>

      <a
        href={`http://localhost:5000/api/pyq/download/${item._id}`}
        target="_blank"
        rel="noreferrer"
      >
        Download PDF
      </a>
    </div>
  );
}

export default PYQCard;
