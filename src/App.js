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

const filterMap = {
  All: () => true,
  Done: (todo) => todo.isDone,
  Undone: (todo) => !todo.isDone,
};
const filterNames = Object.keys(filterMap);

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 5;

  const indexOfLastTask = currentPage * itemPerPage;
  const indexOfFirstTask = indexOfLastTask - itemPerPage;
  const currentTask = todos.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // add new task
  const addTodo = (todoText) => {
    if (todoText.trim() !== "") {
      const newTask = {
        text: todoText,
        id: Date.now(),
        date: new Date(),
        isDone: false,
      };
      setTodos([newTask, ...todos]);
    }
  };

  // Sort by date
  const dateDown = () => {
    const array = [...todos].sort((a, b) => {
      if (a.date > b.date) {
        return 1;
      } else if (a.date === b.date) {
        return 0;
      } else {
        return -1;
      }
    });
    setTodos(array);
  };

  // Sort by date
  const dateUp = () => {
    const array = [...todos].sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else if (a.date === b.date) {
        return 0;
      } else {
        return -1;
      }
    });
    setTodos(array);
  };

  // delete one task
  const deleteTodo = (id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  const handleChangeStatus = (id) => {
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

  // editing on doubleClick
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

  // filtering by
  const filterList = filterNames.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  return (
    <div className='App'>
      <div className='main'>
        <Title />
        <Form addTodo={addTodo} />
        <div className='tasks-buttons'>
          {filterList}
          <SortByDate />
          <ArrowUp dateUp={dateUp} />
          <ArrowDown dateDown={dateDown} />
        </div>
        <div className='tasks-task'>
          <Tasks
            todos={currentTask}
            deleteTodo={deleteTodo}
            handleChangeStatus={handleChangeStatus}
            editTodo={editTodo}
            filterMap={filterMap}
            filter={filter}
          />
        </div>
        {todos.length !== 0 ? (
          <Pages
            paginate={paginate}
            itemPerPage={itemPerPage}
            totaItems={todos.length}
            currentPage={currentPage}
          />
        ) : (
          <h2>Tasks not found</h2>
        )}
      </div>
    </div>
  );
}

export default App;
