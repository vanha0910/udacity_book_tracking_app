import {  useEffect, useState } from "react";
import {  useParams, Link } from "react-router-dom";
import { get } from "../BooksAPI";

function DetailsPage() {
  const params = useParams();
 const [details, setDetails] = useState(null);

  const getBooks = async () => {
    const data = await get(params.id)
    setDetails(data);
  };

  useEffect(() => {
    getBooks();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="list-books">
      <div className="list-books-title">
        <Link to="/">Home</Link>
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
      <div className="book-details">
        <div className="book-details-top">
          <div
            className="book-details-cover"       
          >
            <img src={details && details.imageLinks.thumbnail} alt={details && details.title} />
          </div>
        </div>
        <div className="book-title">{details && details.title}</div>
        <div className="book-authors">{details && details.authors ? details.authors.join(", "): 'Unknown'}</div>
        <div className="book-content">{details && details.description }</div>
      </div>
      </div>   
     
    </div>
  );
}

export default DetailsPage;
