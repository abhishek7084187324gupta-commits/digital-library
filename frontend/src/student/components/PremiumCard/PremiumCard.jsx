import React, { useEffect, useState } from "react";

import "./PremiumCard.css";
import { useNavigate } from "react-router-dom";
import API from "../../../services/api";

function PremiumCard({ item }) {
  const navigate = useNavigate();

  const [isPaid, setIsPaid] = useState(false);

  /* Check payment status */
  const checkPaymentStatus = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      const res = await API.get(
        `/payments/check/${item._id}?userId=${user._id}`,
      );

      setIsPaid(res.data.paid);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkPaymentStatus();
  }, []);

  /* Buy now */
  const handleBuy = () => {
    navigate("/student/payment", {
      state: {
        title: item.title,
        price: item.price,
        premiumId: item._id,
      },
    });
  };

  return (
    <div className="premium-card">
      {/* Cover Image */}
      {item.coverImage ? (
        <img
          src={`http://localhost:5000/uploads/premium/${item.coverImage}`}
          alt={item.title}
          className="premium-cover"
        />
      ) : (
        <div className="premium-placeholder">Premium Notes</div>
      )}

      <h3>{item.title}</h3>

      <p>
        <strong>Subject:</strong> {item.subject}
      </p>

      <p>
        <strong>Semester:</strong> {item.semester}
      </p>

      <p>
        <strong>Price:</strong> ₹ {item.price}
      </p>

      <p className="desc">{item.description}</p>

      {/* After payment completed */}
      {isPaid ? (
        <a
          href={`http://localhost:5000/api/premium/download/${item._id}`}
          target="_blank"
          rel="noreferrer"
          className="download-btn"
        >
          Download Full PDF
        </a>
      ) : (
        <>
          <a
            href={`http://localhost:5000/api/premium/preview/${item._id}`}
            target="_blank"
            rel="noreferrer"
            className="preview-btn"
          >
            Preview Sample
          </a>

          <button onClick={handleBuy}>Buy Now</button>
        </>
      )}
    </div>
  );
}

export default PremiumCard;
