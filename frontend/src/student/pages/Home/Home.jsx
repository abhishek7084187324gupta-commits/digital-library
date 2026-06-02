import React from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />

      <div className="home">
        <div className="hero">
          <h1>Welcome to Smart Library</h1>

          <p>
            Free Notes + Premium Notes + PYQ + Book Requests + Admin Management
            System
          </p>

          <div className="hero-buttons">
            <Link to="/student/dashboard">Explore Library</Link>

            <Link to="/register">Get Started</Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
