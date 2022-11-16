import React from "react";
import "./Input.css";

function Input() {
  return (
    <div>
      <input className='input' type='text' placeholder='Add new todo' />
      <button className='add-button'>Add</button>
    </div>
  );
}

export default Input;
