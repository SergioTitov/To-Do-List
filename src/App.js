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
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 5;

  // const filterTodos = () => todos.filter(filterMap[filter]);

  const [isEditing, setEditing] = useState(false);

  const [sorterBy, setSorterBy] = useState("desc");

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [countTodos, setCountTodos] = useState();

  // const indexOfLastTask = currentPage * itemPerPage;
  // const indexOfFirstTask = indexOfLastTask - itemPerPage;
  // const currentTask = filterTodos().slice(indexOfFirstTask, indexOfLastTask);

  // When delete all tasks on page automatically change page on -1
  // if (currentPage !== 1 && currentTask.length === 0) {
  //   setCurrentPage(currentPage - 1);
  // }

  // API whith Get

  const getTodos = () => {
    setEditing(true);
    axios

      .get(
        `${process.env.REACT_APP_URL}tasks/${process.env.REACT_APP_USERID}?filterBy=${filter}&order=${sorterBy}&pp=${itemPerPage}&page=${currentPage}`
      )
      .then((response) => {
        setCountTodos(response.data.count);
        setTodos(response.data.tasks);
        setEditing(false);
      });
  };

  useEffect(() => {
    getTodos();
  }, [sorterBy, currentPage, filter]);

  // API whith Post

  const addTodo = (todoText) => {
    axios
      .post(
        `${process.env.REACT_APP_URL}task/${process.env.REACT_APP_USERID}`,
        {
          name: todoText,
          done: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      )
      .then((response) => {
        setTodos([response.data, ...todos]);
        getTodos();
      }); //
  };

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
  ////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////
  // Sort by date
  // const dateDown = () => {
  //   const array = [...todos].sort((a, b) => {
  //     if (a.createdAt > b.datcreatedAte) {
  //       return 1;
  //     } else if (a.createdAt === b.createdAt) {
  //       return 0;
  //     } else {
  //       return -1;
  //     }
  //   });
  //   setTodos(array);
  // };

  // // Sort by date
  // const dateUp = () => {
  //   const array = [...todos].sort((a, b) => {
  //     if (a.createdAt < b.createdAt) {
  //       return 1;
  //     } else if (a.createdAt === b.createdAt) {
  //       return 0;
  //     } else {
  //       return -1;
  //     }
  //   });
  //   setTodos(array);
  // };
  ////////////////////////////////////////////////////////////////////////////////////
  // API whith Delete

  function deleteTodo (uuid) {
    axios
      .delete(
        `${process.env.REACT_APP_URL}task/${process.env.REACT_APP_USERID}/${uuid}`
      )
      .then(() => {
        if (currentPage !== 1 && todos.length === 1) {
          setCurrentPage((prev) => prev - 1);
        }
        getTodos();
      });
  }

  ///////////////////////////////////////////////////////////////
  // delete one task

  // const deleteTodo = (uuid) => {
  //   const newTodos = todos.filter((item) => item.uuid !== uuid);

  //   setTodos(newTodos);
  // };
  /////////////////////////////////////////////////////////////////
  // Change done and undone
  // const handleChangeStatus = (uuid) => {
  //   const updatedTodos = todos.map((todo) => {
  //     if (uuid === todo.uuid) {
  //       return { ...todo, done: !todo.done };
  //     }
  //     return todo;
  //   });
  //   setTodos(updatedTodos);
  // };

  // Change done and undone whith API
  const handleChangeStatus = (uuid, done)=>{
    axios
    .patch(
      `${process.env.REACT_APP_URL}task/${process.env.REACT_APP_USERID}/${uuid}`,
      {
       done: !done
      }
    )
    .then(() => {
      console.log(done);
      getTodos();
    });
}
  


  // editing on doubleClick

  function editTodo(uuid, newName, done) {
    axios
      .patch(
        `${process.env.REACT_APP_URL}task/${process.env.REACT_APP_USERID}/${uuid}`,
        {
          name: newName,
          done: done,
        }
      )
      .then(() => {
        console.log(done);
        getTodos();
      });
  }

  ////////////////////////////////////////////////////////
  // editing on doubleClick
  // function editTodo(uuid, newName) {
  //   const editedTodoList = todos.map((todo) => {
  //     if (
  //       uuid === todo.uuid &&
  //       newName.trim() !== "" &&
  //       newName !== todo.filter
  //     ) {
  //       return { ...todo, name: newName };
  //     }
  //     return todo;
  //   });
  //   setTodos(editedTodoList);
  // }
  ///////////////////////////////////////////////////////

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
            <ArrowUp setSorterBy={setSorterBy} />
            <ArrowDown setSorterBy={setSorterBy} />
          </Box>
        </Box>
        <Box
        //  className='tasks-task'
        >
          <Tasks
            todos={todos}
            deleteTodo={deleteTodo}
            handleChangeStatus={handleChangeStatus}
            editTodo={editTodo}
            filterMap={filterMap}
            filter={filter}
            setEditing={setEditing}
            isEditing={isEditing}
          />
        </Box>
        {countTodos ? (
          <Pages
            paginate={paginate}
            filter={filter}
            itemPerPage={itemPerPage}
            countTodos={countTodos}
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
