import React, { useEffect, useState } from "react";
import "./App.css";
import Title from "./components/Title/Title";
import Form from "./components/Form/Form";
import Tasks from "./components/Tasks/Tasks";
import SortByDate from "./components/SortByDate/SortByDate";
import ArrowUp from "./components/ArrowUp/ArrowUp";
import ArrowDown from "./components/ArrowDown/ArrowDown";
import Pages from "./components/Pages/Pages";
import FilterButton from "./components/FilterButton/FilterButton";
import { Box, Text } from "@chakra-ui/react";
import axios from "axios";

const filterMap = {
  All: () => true,
  Done: (todo) => todo.done,
  Undone: (todo) => !todo.done,
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

  // When delete all tasks on page automatically change page on -1
  if (currentPage !== 1 && currentTask.length === 0) {
    setCurrentPage(currentPage - 1);
  }

  // useEffect(()=>{
  //   axios.get("https://todo-api-learning.herokuapp.com/v1/task/7").then((data)=>{
  //     console.log(data);
  //     debugger
  //   })
  // }, [])

  // .then((response) => {
  //   setTodos(response.data)
  // })

  // add new task

  // axios.get("https://todo-api-learning.herokuapp.com/v1/task/7").then((response) => {
  //   addTodo(response.data)
  //   });

  const baseURL = "http://learning.alpacait.ru:3000/v1/";

  // useEffect(() => {
  //   axios.get(`${baseURL}tasks/7`).then((response) => {
  //     setTodos(response.data);
  //   });
  // }, []);


///////////////////////// GET

// API whith Get 

  const [countTodos, setCountTodos] = useState();

  const getTodos = () => {
    axios.get(`${baseURL}tasks/7`).then((response) => {
      setCountTodos(response.data.count);
      console.log(countTodos);
      setTodos(response.data.tasks);
    });
  };

  useEffect(() => {
    getTodos();
  }, []);
////////////////////////////////

// API whith Post

  const addTodo = (todoText) => {
    axios
      .post(`${baseURL}task/7`, {
        name: todoText,
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .then((response) => {
        setTodos([response.data, ...todos]);
      });
  };
  console.log(todos);

  /////////////////////////////////////////////////////////////////////////////////////
  // const addTodo = (todoText) => {
  //   if (todoText.trim() !== "") {
  //     const newTask = {
  //       name: todoText,
  //       uuid: Date.now(),
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //       // date: new Date(),
  //       done: false,
  //     };
  //     setTodos(
  //       [newTask, ...todos].filter(
  //         (value, index, todos) =>
  //           index === todos.findLastIndex((item) => item.name === value.name)
  //       )
  //     );
  //   }
  // };
  /////////////////////////////////////////////////////////////////////////////////////

  // Sort by date
  const dateDown = () => {
    const array = [...todos].sort((a, b) => {
      if (a.createdAt > b.datcreatedAte) {
        return 1;
      } else if (a.createdAt === b.createdAt) {
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
      if (a.updatedAt < b.updatedAt) {
        return 1;
      } else if (a.updatedAt === b.updatedAt) {
        return 0;
      } else {
        return -1;
      }
    });
    setTodos(array);
  };

  // API whith Delete

  function deleteTodo(uuid) {
    axios.delete(`${baseURL}task/7/${uuid}`).then(() => {
      getTodos();
    });
  }

  // useEffect(() => {
  //   deleteTodo();
  // }, []);


  // useEffect(() => {
  //   function deleteTodo(uuid) {
  //     axios
  //       .delete(`${baseURL}task/7/${uuid}`)

  //       .then(() => {
  //         setTodos(null);
  //       });
  //   }

  //   deleteTodo();
  // }, []);

  ///////////////////////////////////////////////////////////////
  // delete one task

  // const deleteTodo = (uuid) => {
  //   const newTodos = todos.filter((item) => item.uuid !== uuid);

  //   setTodos(newTodos);
  // };
  /////////////////////////////////////////////////////////////////
  //Change done and undone
  const handleChangeStatus = (uuid) => {
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
      if (
        uuid === todo.uuid &&
        newName.trim() !== "" &&
        newName !== todo.filter
      ) {
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
    <Box
      bgColor=' rgb(36, 61, 61)'
      h='100vh'
      display='flex'
      flexDirection='column'
      justifyContent='flex-start'
      alignItems='center'
      textAlign='center'
      bgSize='100% auto'
      // className='App'
    >
      <Box
        pl='35px'
        pr='35px'
        mt='60px'
        padding
        w='auto'
        h='700px'
        backgroundImage='url(/assets/backgr.jpg)'
        backgroundPosition='center'
        backgroundRepeat='no-repeat'
        bgSize='100% auto'

        // className='main'
      >
        <Title />
        <Form addTodo={addTodo} />
        <Box
          w={["xs", "xs", "sm", "md", "2xl", "3xl"]}
          display='flex'
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
          flexWrap='nowrap'
          mb='10px'
          // className='tasks-buttons'
        >
          <Box display='flex' flexWrap='nowrap'>
            {filterList}
          </Box>
          <Box
            display='flex'
            flexDirection='row'
            justifyContent='flex-end'
            alignItems='center'
            flexWrap='nowrap'
            mb='10px'
          >
            <SortByDate />
            <ArrowUp dateUp={dateUp} />
            <ArrowDown dateDown={dateDown} />
          </Box>
        </Box>
        <Box
        //  className='tasks-task'
        >
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
        </Box>
        {filterTodos().length !== 0 ? (
          <Pages
            paginate={paginate}
            filter={filter}
            itemPerPage={itemPerPage}
            totaItems={filterTodos().length}
            currentPage={currentPage}
          />
        ) : (
          <Text color='white'>Tasks not found</Text>
        )}
      </Box>
    </Box>
  );
}

export default App;
