import React, { useContext, useEffect, useState } from "react";
import { LoaderContext, SearchQueryContext } from "../../App";
import "./Books.css";

function Books(props) {
  const [books, setBooks] = useState([]);
  const { data } = props;
  const { loader } = useContext(LoaderContext);
  const { searchQuery } = useContext(SearchQueryContext);

  useEffect(() => {
    if (data && data.books) {
      setBooks(data.books);
    } else if (data && data.books && data.books.error) {
      setBooks([]);
    }
  }, [data]);


  const filteredBooks = books.filter(book => {
    if (!searchQuery.trim()) {
      return true; 
    } else {
      const searchKeywords = searchQuery.toLowerCase().split(" ");
      return searchKeywords.every(keyword => book.title.toLowerCase().includes(keyword));
    }
  });

  return (
    <div className="container">
      {loader && (
        <div id="loader">
          <div id="loader-circle"></div>
        </div>
      )}

      {!loader && searchQuery !== "" && (
        <div className="results">
          <h1>
            <span className="query">{searchQuery}</span>
          </h1>
          <p className="status">
            {filteredBooks.length} search results were found
          </p>
        </div>
      )}

      <div className="books">
        {!loader &&
          filteredBooks.map((book) => (
            <div className="book" key={book.id}>
              <div className="book-img-container">
                <img
                  className="book-img"
                  src={book?.imageLinks?.thumbnail}
                  alt={
                    book?.imageLinks?.thumbnail
                      ? undefined
                      : "Image not available"
                  }
                />
              </div>
              <div className="book-details">
                <p className="book-title">{book.title}</p>

                <div className="book-details-row">
                  {book.averageRating ? (
                    <div className="book-rating">
                      <img src="./icons/star.svg" alt="" />
                      <p>{book?.averageRating} / 5</p>
                    </div>
                  ) : (
                    <div className="book-rating">
                      <img src="./icons/star.svg" alt="" />
                      <p>N A</p>
                    </div>
                  )}
                  <p className="book-cost">Free</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Books;
