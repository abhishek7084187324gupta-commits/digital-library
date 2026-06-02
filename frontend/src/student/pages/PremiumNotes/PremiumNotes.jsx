import React, { useEffect, useState } from "react";

import "./PremiumNotes.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import PremiumCard from "../../components/PremiumCard/PremiumCard";
import API from "../../../services/api";

function PremiumNotes() {
  const [premiumData, setPremiumData] = useState([]);

  const fetchPremium = async () => {
    try {
      const res = await API.get("/premium");

      /* FIX HERE */
      setPremiumData(res.data.content || []);
    } catch (error) {
      console.log(error);
      setPremiumData([]);
    }
  };

  useEffect(() => {
    fetchPremium();
  }, []);

  return (
    <>
      <Navbar />

      <div className="premium-page">
        <h1>Premium Notes</h1>

        <div className="premium-grid">
          {premiumData.length > 0 ? (
            premiumData.map((item) => (
              <PremiumCard key={item._id} item={item} />
            ))
          ) : (
            <p>No Premium Notes Available</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default PremiumNotes;
