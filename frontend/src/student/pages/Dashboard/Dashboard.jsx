import React, { useEffect, useState } from "react";

import "./Dashboard.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import BookCard from "../../components/BookCard/BookCard";
import API from "../../../services/api";

function Dashboard() {
  const [books, setBooks] = useState([]);

  const [search, setSearch] = useState("");

  const fetchBooks = async () => {
    try {
      const res = await API.get(`/books?search=${search}`);

      /* FIX HERE */
      setBooks(res.data.books || []);
    } catch (error) {
      console.log(error);
      setBooks([]);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <h1>Library Dashboard</h1>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={fetchBooks}>Search</button>
        </div>

        <div className="books-grid">
          {books.length > 0 ? (
            books.map((book) => <BookCard key={book._id} book={book} />)
          ) : (
            <p>No Books Available</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;
