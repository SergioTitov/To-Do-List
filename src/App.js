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
import axios from "axios";

// Add new task axios
// const postAxios = "https://todo-api-learning.herokuapp.com/v1/task/7"

// const afsd = `https://todo-api-learning.herokuapp.com/v1/tasks/7?filterBy=${}&order=desc&pp=5&page=1`
// .then((response) => {
//   setTodos(response.data)
// })
// const baseUrl = "https://todo-api-learning.herokuapp.com/v1/tasks/7?pp=5&page=1";

const filterMap = {
  All: () => true,
  Done: (todo) => todo.done,
  Undone: (todo) => !todo.done,
};

const filterNames = Object.keys(filterMap);

function App() {
  // axios.get(baseUrl).then((res) => {
  //   console.log(res);
  // });

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

  // When delete all tasks on page automatically change page on -1
  if (currentPage !== 1 && currentTask.length === 0) {
    setCurrentPage(currentPage - 1);
  }

  // add new task
  const addTodo = (todoText) => {
    if (todoText.trim() !== "") {
      const newTask = {
        name: todoText,
        uuid: Date.now(),
        date: new Date(),
        done: false,
      };
      setTodos(
        [newTask, ...todos].filter(
          (value, index, todos) =>
            index === todos.findLastIndex((item) => item.name === value.name)
        )
      );
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
  const deleteTodo = (uuid) => {
    const newTodos = todos.filter((item) => item.uuid !== uuid);
    setTodos(newTodos);
  };

  //Change done and undone
  const handleChangeStatus = (uuid) => {
    // let [obj] = todos.filter((item) => item.id === id);
    // obj.isDone = !isDone;
    // let todosClone = [...todos];
    // todosClone[todos.findIndex((item) => item.id === id)] = obj;
    // setTodos([...todosClone]);
    const updatedTodos = todos.map((todo) => {
      if (uuid === todo.uuid) {
        return { ...todo, done: !todo.done };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // editing on doubleClick
  function editTodo(uuid, newName) {
    const editedTodoList = todos.map((todo) => {
      if (uuid === todo.uuid && newName.trim() !== "") {
        return { ...todo, name: newName };
      }
      return todo;
    });
    setTodos(editedTodoList);
  }

  // filtering by All, Done and Undone
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
