import React, { useState } from "react";
import "./Form.css";

function Form(props) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // props.onSubmit({
    //   id: Math.floor(Math.random() * 10000),
    //   text: input,
    // });

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
