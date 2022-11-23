import React from "react";
import "./Pages.css";

function Pages({ itemPerPage, totaItems, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totaItems / itemPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='pages'>
      {pageNumbers.length === 1 ? (
        <button className='pages_left_notActive' />
      ) : (
        <button
          className='page_left'
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage <= 1}
        />
      )}
      {pageNumbers.map((number) => (
        <button
          style={{
            color: currentPage === number ? "white" : "",
            backgroundColor: currentPage === number ? "rgb(47, 79, 79)" : "",
          }}
          onClick={() => paginate(number)}
          key={number}
          className='page'
        >
          {number}
        </button>
      ))}

      {pageNumbers.length === 1 ? (
        <button className='pages_left_notActive' />
      ) : (
        <button
          className='page_right'
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage >= pageNumbers.length}
        />
      )}
    </div>
  );
}

export default Pages;
