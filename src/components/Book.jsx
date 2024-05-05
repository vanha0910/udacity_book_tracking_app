// Book.js
import React from "react";
import BookController from "./BookController";
import { Link } from "react-router-dom";

const Book = ({ book , onChange }) => {
  const { title, authors, imageLinks, shelf, id } = book;

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${imageLinks.thumbnail}")`,
            }}
          ></div>
          <BookController onChange={(value) => onChange && onChange(value, book)} value={shelf}/>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors ? authors.join(", "): 'Unknown'}</div>
        <div className="book-link"><Link to={`/details/${id}`} >Details</Link></div>
      </div>
    </li>
  );
};

export default Book;
