import React, { useState } from "react";
import "./Form.css";

function Form({ addTodo }) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='input'
        type='text'
        placeholder='Add new todo'
        uuid='todo-input'
        value={input}
        name='name'
        onChange={handleChange}
      />
      <button className='add-button' uuid='add-button'>
        Add
      </button>
    </form>
  );
}

export default Form;
