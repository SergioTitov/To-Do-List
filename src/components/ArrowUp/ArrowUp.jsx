import React from "react";
import "./ArrowUp.css";

function ArrowUp({ dateUp }) {
  return (
    <div>
      <button
        className='ArrowUp'
        onClick={() => {
          dateUp();
        }}
      />
    </div>
  );
}

export default ArrowUp;
