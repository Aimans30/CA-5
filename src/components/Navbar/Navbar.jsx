import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SearchQueryContext } from "../../App";
import "./Navbar.css";

function Navbar() {
  const { searchQuery, setSearchQuery } = useContext(SearchQueryContext);
  const [searchInput, setSearchInput] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setSearchInput("");
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-logo" onClick={() => setSearchQuery("")}>
        <span>KALVIUM Books</span>
      </Link>
      <form className="navbar-search-container" onSubmit={handleSearch}>
        <input
          className="navbar-search-input"
          type="text"
          placeholder="Search Books"
          value={searchInput}
          onChange={handleInputChange}
        />
        <button className="navbar-search-btn" type="submit">
          <img src="./icons/search.svg" alt="" />
        </button>
      </form>

      <div className="navbar-cta-register">
        <Link to="/register" className="navbar-login-link">
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
