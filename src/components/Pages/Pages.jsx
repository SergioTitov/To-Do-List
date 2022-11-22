import React from "react";
import "./Pages.css";

function Pages({ itemPerPage, totaItems, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totaItems / itemPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='pages'>
      <button
        className='page_left'
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage <= 1}
      ></button>
      {pageNumbers.map((number) => (
        <button onClick={() => paginate(number)} key={number} className='page'>
          {number}
        </button>
      ))}
      <button
        className='page_right'
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage >= pageNumbers.length}
      ></button>
    </div>
  );
}

export default Pages;
