import React, { useState } from "react";
import "./Input.css";

function Input() {
  const [input, setInput] = useState("");
  return (
    <div>
      <input
        className='input'
        type='text'
        placeholder='Add new todo'
        id='todo-input'
        value={input}
      />
      <button className='add-button' id='add-button'>
        Add
      </button>
    </div>
  );
}

export default Input;
