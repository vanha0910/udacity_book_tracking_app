import { useState } from "react";
import { Link } from "react-router-dom";
import Book from "../components/Book";

import { search, update } from "../BooksAPI";
import { MAX_SEARCH_NUMBER, NONE_VALUE } from "../constants";
import { debounce } from "../helpers";

function SearchPage() {
  const [value, setValue] = useState("");
  const [books, setBooks] = useState([]);

  const updateInput = (e) => {
    const value = e.target.value;
    setValue(value);
    if (value && value.trim()) {
      throttleSearch(value);
    } else {
      setBooks([]);
    }
  };

  const updateShelf = async (shelf, book) => {
    await update(book, shelf);
  };

  const throttleSearch = debounce(async (e) => {
    try {
      const results = await search(value, MAX_SEARCH_NUMBER);
      setBooks(
        Array.isArray(results)
          ? results.filter((book) => book.imageLinks && book.imageLinks.thumbnail)
          : []
      );
    } catch (error) {
      console.error("Error occurred while searching:", error);
      setBooks([])
    }
  });
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={value}
            onChange={updateInput}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books.map((book) => (
            <Book
              key={book.id}
              book={{ ...book, shelf: book.shelf || NONE_VALUE }}
              onChange={updateShelf}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

export default SearchPage;
