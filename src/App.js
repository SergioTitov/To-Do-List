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

  const filterTodos = () => todos.filter(filterMap[filter]);

  const indexOfLastTask = currentPage * itemPerPage;
  const indexOfFirstTask = indexOfLastTask - itemPerPage;
  const currentTask = filterTodos().slice(indexOfFirstTask, indexOfLastTask);

  const [isEditing, setEditing] = useState(false);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  ////////////////////////////////////////

  ////////////////////////////////////////
  
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

  //Change done and undone
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
      if (id === todo.id) {
        return { ...todo, text: newName };
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
      setCurrentPage={setCurrentPage}
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
            setEditing={setEditing}
            isEditing={isEditing}
          />
        </div>
        {filterTodos().length !== 0 ? (
          <Pages
            paginate={paginate}
            filter={filter}
            itemPerPage={itemPerPage}
            totaItems={filterTodos().length}
            currentPage={currentPage}
          />
        ) : (
          <h3>Tasks not found</h3>
        )}
      </div>
    </div>
  );
}

export default App;
