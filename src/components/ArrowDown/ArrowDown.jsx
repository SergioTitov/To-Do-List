import React from "react";
import "./ArrowDown.css";

function ArrowDown({dateDown}) {
  return (
    <div>
      <button className='ArrowDown' onClick={() => {
                dateDown();                
              }}
              
              />
    </div>
  );
}

export default ArrowDown;
