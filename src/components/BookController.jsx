import React from "react";
import { CONTROL_VALUES, NONE_VALUE } from "../constants";

const BookController = ({  onChange , value}) => {

  const handleChange = (e) => {
    if(e.target.value === NONE_VALUE) return
    onChange(e.target.value);
  };

    return (
      <div className="book-shelf-changer">
        <select value={value} onChange={handleChange}>
          <option value="" disabled>
            Move to...
          </option>
          {CONTROL_VALUES.map(item => (<option key={item.value} value={item.value}>{item.label}</option>))}
         
        </select>
      </div>
    );
  };

  export default BookController