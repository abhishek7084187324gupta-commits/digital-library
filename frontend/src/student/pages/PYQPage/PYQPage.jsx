import React, { useEffect, useState } from "react";

import "./PYQPage.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import PYQCard from "../../components/PYQCard/PYQCard";
import API from "../../../services/api";

function PYQPage() {
  const [pyqData, setPyqData] = useState([]);

  const fetchPYQ = async () => {
    try {
      const res = await API.get("/pyq");

      setPyqData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPYQ();
  }, []);

  return (
    <>
      <Navbar />

      <div className="pyq-page">
        <h1>Previous Year Questions</h1>

        <div className="pyq-grid">
          {pyqData.map((item) => (
            <PYQCard key={item._id} item={item} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default PYQPage;
