import React from "react";
import "./Pages.css";

function Pages({ itemPerPage, totaItems, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totaItems / itemPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pages">
      <button className="page_left" />
      {pageNumbers.map((number) => (
        <button onClick={() => paginate(number)} key={number} className="page">
          {number}
        </button>
      ))}
      <button className="page_right" />
    </div>
  );
}

export default Pages;
