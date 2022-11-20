import React, { useState } from "react";
import "./App.css";
import Title from "./components/Title/Title";
import Form from "./components/Form/Form";
import Tasks from "./components/Tasks/Tasks";
import SortByDate from "./components/SortByDate/SortByDate";
import ArrowUp from "./components/ArrowUp/ArrowUp";
import ArrowDown from "./components/ArrowDown/ArrowDown";
import Pages from "./components/Pages/Pages";
import FilterButton from "./components/FilterButton/FilterButton";

const FILTER_MAP = {
  All: () => true,
  Done: (todo) => todo.isDone,
  Undone: (todo) => !todo.isDone,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 5;

  const indexOfLastTask = currentPage * itemPerPage;
  const indexOfFirstTask = indexOfLastTask - itemPerPage;
  const currentTask = todos.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const addTodo = (todoText) => {
    if (todoText.trim() !== "") {
      const newTask = {
        text: todoText,
        id: Date.now(),
        date: new Date(),
        isDone: false,
      };
      setTodos([...todos, newTask]);
    }
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  const handleChangeStatus = (isDone, id) => {
    // let [obj] = todos.filter((item) => item.id === id);
    // obj.isDone = !isDone;
    // let todosClone = [...todos];
    // todosClone[todos.findIndex((item) => item.id === id)] = obj;
    // setTodos([...todosClone]);

    const updatedTodos = todos.map((todo) => {
      if (id === todo.id) {
        return { ...todo, isDone: !todo.isDone };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  function editTodo(id, newName) {
    const editedTodoList = todos.map((todo) => {
      console.log(id);
      if (id === todo.id) {
        return { ...todo, name: newName };
      }
      return todo;
    });
    setTodos(editedTodoList);
  }

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  return (
    <div className="App">
      <div className="main">
        <Title />
        <Form addTodo={addTodo} />
        <div className="tasks-buttons">
          {filterList}
          <SortByDate />
          <ArrowUp />
          <ArrowDown />
        </div>
        <div className="tasks-task">
          <Tasks
            todos={currentTask}
            deleteTodo={deleteTodo}
            handleChangeStatus={handleChangeStatus}
            editTodo={editTodo}
            FILTER_MAP={FILTER_MAP}
            filter={filter}
          />
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
