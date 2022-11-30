import React, { useState } from "react";
// import "./Form.css";
import { Button, Input} from "@chakra-ui/react";

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
    <form onSubmit={handleSubmit}
    >
      <Input
        w='710px'
        h='30px'
        borderRadius='4px'
        mb='30px'
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
      <Button className='add-button' uuid='add-button'>
        Add
      </Button>
    </form>
  );
}

export default Form;
