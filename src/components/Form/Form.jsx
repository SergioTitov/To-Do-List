import React, { useState } from "react";
// import "./Form.css";
import { Button, Input, Flex } from "@chakra-ui/react";

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
      <Flex
        w={["xs", "xs", "sm", "md", "2xl", "3xl"]}
        display='flex'
        flexDirection='row'
        justifyContent='center'
        alignItems='center'
        flexWrap='nowrap'
        mb='10px'
      >
        <Input
          h='40px'
          color='white'
          borderRadius='4px'
          mr='5px'
          wordBreak='break-all'
          bg='rgba(124, 117, 117, 0.651)'
          paddingLeft='10px'
          className='input'
          type='text'
          placeholder='Add new todo'
          uuid='todo-input'
          value={input}
          name='name'
          onChange={handleChange}
        />
        <Button type='submit' className='add-button' uuid='add-button'>
          Add
        </Button>
      </Flex>
    </form>
  );
}

export default Form;
