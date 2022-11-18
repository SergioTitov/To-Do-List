import "./App.css";
import Title from "./components/Title/Title";
import Form from "./components/Form/Form";
import Tasks from "./components/Tasks/Tasks";
import All from "./components/All/All";
import Done from "./components/Done/Done";
import Undone from "./components/Undone/Undone";
import SortByDate from "./components/SortByDate/SortByDate";
import ArrowUp from "./components/ArrowUp/ArrowUp";
import ArrowDown from "./components/ArrowDown/ArrowDown";
import Pages from "./components/Pages/Pages";
import React, { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 5;

  const indexOfLastTask = currentPage * itemPerPage;
  const indexOfFirstTask = indexOfLastTask - itemPerPage;
  const currentTask = todos.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const saveTodo = (todoText) => {
    if (todoText.trim() !== "") {
      setTodos([...todos, { text: todoText, id: Date.now(), isDone: false }]);
    }
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  // const doneTodo = (isDone) => {
  //   const isdoneTodo = doneTodo.filter((item) => item.isDone !== false);
  // };

  return (
    <div className='App'>
      <div className='main'>
        <Title />
        <Form saveTodo={saveTodo} />
        <div className='tasks-buttons'>
          <All />
          <Done />
          <Undone />
          <SortByDate />
          <ArrowUp />
          <ArrowDown />
        </div>
        <div className='tasks-task'>
          <Tasks todos={currentTask} deleteTodo={deleteTodo} />
        </div>
        <Pages
          paginate={paginate}
          itemPerPage={itemPerPage}
          totaItems={todos.length}
        />
      </div>
    </div>
  );
}

export default App;
