import {  useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAll, update } from "../BooksAPI";
import { READ, WANT_TO_READ, CURRENT_READING } from "../constants";
import Book from "../components/Book";
import Loader from "../components/Loader";

function MainPage() {
  const [books, setBooks] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const updateShelf = (shelf, book) => {
    setLoading(true);
    update(book, shelf)
      .then((data) => {
        getBooks();
      })
      .catch((e) => {
        console.log("error", e);
        setLoading(false);
      });
  };

  const getBooks = () => {
    getAll()
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((e) => {
        console.log("errorerrorerror", e);
        setBooks([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    getBooks();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books
                  .filter((item) => item.shelf === CURRENT_READING)
                  .map((book) => (
                    <Book key={book.id} book={book} onChange={updateShelf} />
                  ))}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books
                  .filter((item) => item.shelf === WANT_TO_READ)
                  .map((book) => (
                    <Book key={book.id} book={book} onChange={updateShelf}/>
                  ))}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books
                  .filter((item) => item.shelf === READ)
                  .map((book) =>
                    book ? <Book key={book.id} book={book} onChange={updateShelf}/> : ""
                  )}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add book</Link>
      </div>
      {isLoading && <Loader />}
    </div>
  );
}

export default MainPage;
