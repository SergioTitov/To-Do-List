import React, { useState } from "react";
import "./Form.css";

function Form({saveTodo}) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveTodo(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='input'
        type='text'
        placeholder='Add new todo'
        id='todo-input'
        value={input}
        name='text'
        onChange={handleChange}
      />
      <button className='add-button' id='add-button'>
        Add
      </button>
    </form>
  );
}

export default Form;
