import React, { useState } from "react";

import {
  Box,
  Flex,
  Input,
  Text,
  Button,
  Checkbox,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
function Tasks({
  todos,
  deleteTodo,
  handleChangeStatus,
  editTodo,
  setEditing,
  isEditing,
}) {
  const [nesText, setNesText] = useState("");
  const [newText, setNewText] = useState(nesText);

  function handleChange(e) {
    setNewText(e.target.value);
  }

  const goOut = (e) => {
    setNewText("");
    setEditing(false);
    setEditing(e.target.blank);
  };

  const GoOutOnEsc = (e) => {
    if (e.keyCode === 27) {
      goOut();
    }
  };

  return (
    <Box>
      {todos.map(({ name, uuid, createdAt, done }) =>
        isEditing === uuid ? (
          <Flex
            w={["xs", "xs", "sm", "md", "2xl", "3xl"]}
            bgColor='rgb(47, 79, 79)'
            mb='10px'
            display='flex'
            flex-direction='row'
            justify-content='center'
            align-items='center'
            key={uuid}
            // className='tasks'
          >
            <form
              // display='flex'
              // flexDirection='colomn'
              // justifyContent='center'
              // alignItems='center'
              // flexWrap='nowrap'
              onSubmit={(e) => {
                e.preventDefault();
                editTodo(uuid, newText, done);
                setNewText("");
                setEditing("");
              }}
            >
              <Box w={["xs", "xs", "sm", "md", "2xl", "3xl"]}>
                <Input
                  bgColor=' rgb(36, 61, 61)'
                  color='white'
                  h='31px'
                  autoFocus
                  onKeyUp={GoOutOnEsc}
                  key={uuid}
                  placeholder='edit todo'
                  value={newText}
                  onChange={handleChange}
                  type='name'
                />
                <Box>
                  <Button type='button' h='20px' mr={1} onClick={goOut}>
                    Cancel
                  </Button>
                  <Button type='submit' h='20px'>
                    Save
                  </Button>
                </Box>
              </Box>
            </form>
          </Flex>
        ) : (
          <Flex
            w={["xs", "xs", "sm", "md", "2xl", "3xl"]}
            display='flex'
            flexDirection='row'
            justifyContent='center'
            alignItems='center'
            flexWrap='nowrap'
            bgColor='rgb(47, 79, 79)'
            mb='10px'
            minH='55px'
            // className='tasks'
            key={uuid}
          >
            <Checkbox
              isChecked={done}
              ml={1}
              type='checkbox'
              colorScheme='green.100'
              uuid={uuid}
              // checked={done}
              onChange={() => handleChangeStatus(uuid, done)}
            ></Checkbox>
            <Box
              w={630}
              //  className='task'
            >
              <Text
                color='white'
                wordBreak='break-all'
                onDoubleClick={() => {
                  setEditing(uuid);
                  setNesText(name);
                }}
              >
                {name}
              </Text>
            </Box>
            <Box
              color='white'
              w={130}
              mt={0}
              mb={0}
              // className='task-date'
            >
              <Text>{createdAt.toLocaleString()}</Text>
            </Box>

            <IconButton
              icon={<DeleteIcon />}
              padding={0}
              h='20px'
              ml='5px'
              // className='delete-task'
              onClick={() => {
                deleteTodo(uuid);
              }}
            />
          </Flex>
        )
      )}
    </Box>
  );
}

export default Tasks;
