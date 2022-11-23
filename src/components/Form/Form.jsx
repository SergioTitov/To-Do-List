import React, { useState } from "react";
import "./Form.css";

function Form({ addTodo }) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value); //элемент на котором произошло событие ввода текста, мы берем его значение
  };

  // const doublTask = todos.some( {setInput} ) =>  {setInput} === todos;

  const handleSubmit = (e) => {
    e.preventDefault();
    // doublTask() ? setInput(""):
    // addTodo(input);
    addTodo(input);
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

// for(var i = 0; i < greetings.length; i++) {
//   var input = greetings[i];
//   if(greetings[i].indexOf('Рождеств') !== -1) {
//   var result = input;
//   var listItem = document.createElement('li');
//   listItem.textContent = result;
//   list.appendChild(listItem);
//   }